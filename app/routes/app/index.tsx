import React from "react";
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useSearchParams,
  useNavigation,
  useNavigate,
  Form,
  useFetcher,
} from "react-router";
import { useForm } from "react-hook-form";
import getPantryShelves from "./model/getPantryShelves";
import Button from "~/components/Button";
import ErrorMessage from "~/components/ErrorMessage";
import Container from "~/components/Container";
import createPantryShelf from "./model/createPantryShelf";
import deletePantryShelf from "./model/deletePantryShelf";
import updateShelf from "./model/updateShelf";
import createPantryItem, {
  createPantryItemSchema,
} from "./model/createPantryItem.server";
import updatePantryItem, {
  updatePantryItemSchema,
} from "./model/updatePantryItem";
import deletePantryItem from "./model/deletePantryItem";
import { validateForm } from "lib/validation";
import type { Route } from "./+types";
import { itemIdSchema, saveShelfNameSchema, shelfIdSchema } from "./validation";
import type { OptimisticShelf, PantryItem, PantrySelf } from "./types";
import ShelfCard from "./components/shelfCard";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pantry - Recipe App" },
    {
      name: "description",
      content: "Manage your ingredients and pantry items for your recipes.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const pantryShelves = await getPantryShelves(q);
  return { pantryItems: pantryShelves };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  switch (formData.get("_action")) {
    case "createShelf": {
      const result = await createPantryShelf();
      return result;
    }
    case "deleteShelf": {
      return validateForm(
        formData,
        shelfIdSchema,
        async (data) => {
          return await deletePantryShelf(String(data.shelfId));
        },
        (errors) => {
          return { errors };
        }
      );
    }
    case "saveShelf": {
      return validateForm(
        formData,
        saveShelfNameSchema,
        async (data) => {
          return await updateShelf({
            shelfId: String(data.shelfId),
            name: data.shelfName,
          });
        },
        (errors) => {
          return { errors };
        }
      );
    }
    case "createItem": {
      return validateForm(
        formData,
        createPantryItemSchema,
        async (data) => {
          return await createPantryItem({
            name: data.name,
            category: data.category,
            quantity: data.quantity,
            unit: data.unit,
            pantrySelfId: data.pantrySelfId,
            expiryDate: data.expiryDate,
            notes: data.notes,
          });
        },
        (errors) => {
          return { errors };
        }
      );
    }
    case "updateItem": {
      return validateForm(
        formData,
        updatePantryItemSchema,
        async (data) => {
          return await updatePantryItem({
            id: data.id,
            name: data.name,
            category: data.category,
            quantity: data.quantity,
            unit: data.unit,
            expiryDate: data.expiryDate,
            notes: data.notes,
          });
        },
        (errors) => {
          return { errors };
        }
      );
    }
    case "deleteItem": {
      return validateForm(
        formData,
        itemIdSchema,
        async (data) => {
          return await deletePantryItem(data.itemId);
        },
        (errors) => {
          return { errors };
        }
      );
    }
    default: {
      return null;
    }
  }
}

export default function Pantry() {
  const { pantryItems } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSearching = navigation.state === "loading";
  const searchQuery = searchParams.get("q") || "";
  const createShelfFetcher = useFetcher();
  const deleteShelfFetcher = useFetcher();
  const isCreatingShelf =
    createShelfFetcher.formData?.get("_action") === "createShelf";

  // Optimistic UI state
  const [optimisticShelves, setOptimisticShelves] = React.useState<
    OptimisticShelf[]
  >([]);
  const [deletingShelfIds, setDeletingShelfIds] = React.useState<Set<string>>(
    new Set()
  );

  // Type guard to ensure pantryItems is an array
  const isValidPantryItems = Array.isArray(pantryItems);
  const serverShelves = (isValidPantryItems ? pantryItems : []) as PantrySelf[];

  // Merge server shelves with optimistic shelves
  const shelves = React.useMemo(() => {
    const serverShelfIds = new Set(serverShelves.map((s) => s.id));
    const optimisticOnly = optimisticShelves.filter(
      (s) => !serverShelfIds.has(s.id)
    );

    // Filter out shelves that are being optimistically deleted
    return [
      ...serverShelves.filter((s) => !deletingShelfIds.has(s.id)),
      ...optimisticOnly,
    ];
  }, [serverShelves, optimisticShelves, deletingShelfIds]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      q: searchQuery,
    },
  });

  const onSubmit = (data: { q: string }) => {
    if (data.q) {
      navigate(`?q=${encodeURIComponent(data.q)}`);
    }
  };

  const handleReset = () => {
    reset({ q: "" });
    navigate("/app/pantry");
  };

  // Handle optimistic create shelf
  React.useEffect(() => {
    if (isCreatingShelf && createShelfFetcher.state === "submitting") {
      const newOptimisticShelf: OptimisticShelf = {
        id: `optimistic-${Date.now()}`,
        name: "New Shelf",
        type: "custom",
        order: 0,
        items: [],
        isOptimistic: true,
      };
      setOptimisticShelves((prev) => [...prev, newOptimisticShelf]);
    }
  }, [isCreatingShelf, createShelfFetcher.state]);

  // Clear optimistic state when create succeeds
  React.useEffect(() => {
    if (
      createShelfFetcher.state === "idle" &&
      createShelfFetcher.data &&
      !createShelfFetcher.data?.errors
    ) {
      setOptimisticShelves((prev) => prev.filter((s) => !s.isOptimistic));
    }
  }, [createShelfFetcher.state, createShelfFetcher.data]);

  // Handle optimistic delete shelf
  React.useEffect(() => {
    if (deleteShelfFetcher.state === "submitting") {
      const formData = deleteShelfFetcher.formData as unknown as FormData;
      const shelfId = formData?.get("shelfId") as string;
      if (shelfId) {
        setDeletingShelfIds((prev) => new Set(prev).add(shelfId));
      }
    }
  }, [deleteShelfFetcher.state, deleteShelfFetcher.formData]);

  // Clear optimistic delete state on completion
  React.useEffect(() => {
    if (deleteShelfFetcher.state === "idle") {
      const formData = deleteShelfFetcher.formData as unknown as FormData;
      const shelfId = formData?.get("shelfId") as string;
      if (shelfId) {
        // Always clear from deleting set when operation completes
        // If there were errors, the shelf will reappear
        setDeletingShelfIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(shelfId);
          return newSet;
        });
      }
    }
  }, [
    deleteShelfFetcher.state,
    deleteShelfFetcher.data,
    deleteShelfFetcher.formData,
  ]);

  const totalItems = shelves.reduce(
    (sum: number, shelf: OptimisticShelf) => sum + shelf.items.length,
    0
  );
  const categories = Array.from(
    new Set(
      shelves.flatMap((shelf: OptimisticShelf) =>
        shelf.items.map((item: PantryItem) => item.category)
      )
    )
  );

  return (
    <Container as="div" size="2xl" py="lg" className="min-h-screen bg-gray-50">
      <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">🛒 My Pantry</h1>
            <p className="text-gray-600 mt-2">Total Items: {totalItems}</p>
          </div>
          <Link
            to="/app"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Dashboard
          </Link>
        </div>
        <div className="mb-8">
          <Form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="flex gap-3 items-center">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  placeholder="Search pantry items..."
                  {...register("q")}
                  className={`w-full px-6 py-3 pl-12 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:shadow-lg transition-all duration-300 bg-white text-gray-900 placeholder-gray-400 ${isSearching ? "opacity-50 cursor-not-allowed animate-pulse" : ""}`}
                  disabled={isSearching}
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-focus-within:opacity-5 transition-opacity duration-300 pointer-events-none" />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSearching}
              >
                Search
              </Button>
              {searchQuery && (
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              )}
            </div>
          </Form>
        </div>
        <div className="mb-6">
          {/* a button for creating a shelf in here  */}
          <createShelfFetcher.Form method="post">
            <Button
              type="submit"
              variant="success"
              size="md"
              value="createShelf"
              name="_action"
              isLoading={isCreatingShelf}
            >
              + Add New Shelf
            </Button>
          </createShelfFetcher.Form>
          {createShelfFetcher.data?.errors?.general && (
            <ErrorMessage
              variant="error"
              size="sm"
              message={createShelfFetcher.data.errors.general}
            />
          )}
        </div>
        {totalItems === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-2xl text-gray-400 mb-4">📋</p>
              <p className="text-xl font-semibold text-gray-600 mb-2">
                No ingredients yet
              </p>
              <p className="text-gray-500 mb-6">
                Add your first ingredient to get started
              </p>
              <Button variant="primary" size="md">
                Add Ingredient
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Pantry Shelves */}
            <div className="space-y-6">
              {shelves.map((shelf: OptimisticShelf) => {
                const isDeletingShelf =
                  deleteShelfFetcher.state === "submitting" &&
                  deleteShelfFetcher.formData?.get("shelfId") === shelf.id;
                return (
                  <ShelfCard
                    key={shelf.id}
                    shelf={shelf}
                    isDeletingShelf={isDeletingShelf}
                    deleteShelfFetcher={deleteShelfFetcher}
                  />
                );
              })}
            </div>
            {/* Summary Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const count = shelves.reduce(
                      (sum: number, shelf: OptimisticShelf) =>
                        sum +
                        shelf.items.filter(
                          (item: PantryItem) => item.category === category
                        ).length,
                      0
                    );
                    return (
                      <span
                        key={category as string}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {category as string} ({count})
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Expiry Status
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">🚨 Expired:</span>
                    <span className="font-bold text-red-600">
                      {shelves.reduce(
                        (sum: number, shelf: OptimisticShelf) =>
                          sum +
                          shelf.items.filter(
                            (item: PantryItem) =>
                              item.expiryDate &&
                              new Date(item.expiryDate) < new Date()
                          ).length,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">
                      ⚠️ Expiring Soon (7 days):
                    </span>
                    <span className="font-bold text-yellow-600">
                      {shelves.reduce(
                        (sum: number, shelf: OptimisticShelf) =>
                          sum +
                          shelf.items.filter(
                            (item: PantryItem) =>
                              item.expiryDate &&
                              new Date(item.expiryDate) <
                                new Date(
                                  Date.now() + 7 * 24 * 60 * 60 * 1000
                                ) &&
                              new Date(item.expiryDate) >= new Date()
                          ).length,
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">✅ Good:</span>
                    <span className="font-bold text-green-600">
                      {shelves.reduce(
                        (sum: number, shelf: OptimisticShelf) =>
                          sum +
                          shelf.items.filter(
                            (item: PantryItem) =>
                              !item.expiryDate ||
                              new Date(item.expiryDate) >=
                                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                          ).length,
                        0
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
    </Container>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Pantry Error";
  let details = "We couldn't load your pantry.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "Pantry Not Found" : "Pantry Error";
    details =
      error.status === 404
        ? "Your pantry couldn't be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Container 
      as="main" 
      className="min-h-screen pt-20 flex flex-col justify-center items-center"
      py="lg"
    >
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">{message}</h1>
        <p className="text-gray-700 mb-6">{details}</p>
        <Link to="/app/pantry" className="inline-block">
          <Button variant="primary" size="md">
            Retry Pantry
          </Button>
        </Link>
      </div>
      {stack && (
        <pre className="mt-6 w-full max-w-2xl p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
          <code>{stack}</code>
        </pre>
      )}
    </Container>
  );
}

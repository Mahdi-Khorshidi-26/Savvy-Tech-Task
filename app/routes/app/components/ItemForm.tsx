import { useFetcher } from "react-router";
import Button from "~/components/Button";
import ErrorMessage from "~/components/ErrorMessage";
import type { PantryItem } from "../types";

interface ItemFormProps {
  mode: "add" | "edit";
  shelfId: string;
  item?: PantryItem;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ItemForm({
  mode,
  shelfId,
  item,
  onSuccess,
  onCancel,
}: ItemFormProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  // Handle successful submission
  if (fetcher.state === "idle" && fetcher.data && !fetcher.data?.errors) {
    onSuccess();
  }

  return (
    <fetcher.Form method="post" className="space-y-4">
      <input
        type="hidden"
        name="_action"
        value={mode === "add" ? "createItem" : "updateItem"}
      />
      {mode === "add" && (
        <input type="hidden" name="pantrySelfId" value={shelfId} />
      )}
      {mode === "edit" && item && (
        <input type="hidden" name="id" value={item.id} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Item Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter item name"
            defaultValue={item?.name || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <input
            id="category"
            type="text"
            name="category"
            placeholder="e.g., Fruits, Dairy, Grains"
            defaultValue={item?.category || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            id="quantity"
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            defaultValue={item?.quantity || 1}
            required
            min="1"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="unit"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Unit <span className="text-red-500">*</span>
          </label>
          <input
            id="unit"
            type="text"
            name="unit"
            placeholder="ml, g, pieces, etc."
            defaultValue={item?.unit || ""}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="expiryDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Expiry Date
          </label>
          <input
            id="expiryDate"
            type="date"
            name="expiryDate"
            defaultValue={
              item?.expiryDate
                ? new Date(item.expiryDate).toISOString().split("T")[0]
                : ""
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Notes
          </label>
          <input
            id="notes"
            type="text"
            name="notes"
            placeholder="Additional notes (optional)"
            defaultValue={item?.notes || ""}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {fetcher.data?.errors && (
        <ErrorMessage
          variant="error"
          size="sm"
          message={Object.values(fetcher.data.errors)[0] as string}
        />
      )}

      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={isSubmitting}
          className="flex-1"
        >
          {mode === "add" ? "Add Item" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={onCancel}
          disabled={isSubmitting}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </fetcher.Form>
  );
}

import Button from "~/components/Button";
import ErrorMessage from "~/components/ErrorMessage";
import Modal from "~/components/Modal";
import ItemForm from "./ItemForm";
import type { OptimisticShelf, PantryItem } from "../types";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";

export default function ShelfCard({
  shelf,
  isDeletingShelf,
  deleteShelfFetcher,
}: {
  shelf: OptimisticShelf;
  isDeletingShelf: boolean;
  deleteShelfFetcher: any;
}) {
  const saveShelfFetcher = useFetcher();
  const isShelfSaving = saveShelfFetcher.state === "submitting";
  const isOptimisticDelete = shelf.isOptimistic && isDeletingShelf;

  const deleteItemFetcher = useFetcher();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);

  if (isOptimisticDelete) {
    return null; // Hide shelf during optimistic delete
  }

  return (
    <div
      key={shelf.id}
      className={`bg-white rounded-lg shadow-lg overflow-hidden transition-opacity duration-300 ${
        isDeletingShelf ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-blue-500 to-blue-600 px-4 sm:px-6 py-4">
        <div className="flex-1 min-w-0">
          <saveShelfFetcher.Form method="post" className="mt-2">
            <input type="hidden" name="shelfId" value={shelf.id} />
            <input
              type="text"
              name="shelfName"
              placeholder="Shelf Name"
              defaultValue={shelf.name}
              className={`mb-2 rounded border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl sm:text-2xl font-bold text-white bg-transparent placeholder-white/70 w-full ${
                isShelfSaving ? "opacity-60 cursor-not-allowed" : ""
              }`}
              disabled={isShelfSaving}
              onBlur={(e) => {
                const newValue = e.currentTarget.value.trim();
                const oldValue = shelf.name.trim();

                if (newValue && newValue !== oldValue) {
                  const formData = new FormData(e.currentTarget.form!);
                  saveShelfFetcher.submit(formData, { method: "post" });
                }
              }}
            />

            <Button
              type="submit"
              variant="ghost"
              size="sm"
              value="saveShelf"
              name="_action"
              isLoading={isShelfSaving}
              className="text-white hover:bg-white/20"
            >
              💾
            </Button>
          </saveShelfFetcher.Form>
          <p className="text-white/90 text-sm">
            Created at: {shelf.createdAt.toLocaleDateString()}
          </p>
          {saveShelfFetcher.data?.errors?.shelfName && (
            <ErrorMessage
              variant="error"
              size="sm"
              message={saveShelfFetcher.data.errors.shelfName}
            />
          )}
          <p className="text-blue-100 text-sm">
            {shelf.items.length} items
            {shelf.isOptimistic && " (saving...)"}
          </p>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-4">
          <deleteShelfFetcher.Form method="post">
            <input type="hidden" name="shelfId" value={shelf.id} />
            <input type="hidden" name="shelfName" value={shelf.name} />
            <Button
              type="submit"
              variant="danger"
              size="sm"
              value="deleteShelf"
              name="_action"
              isLoading={isDeletingShelf}
            >
              🗑️ <span className="hidden sm:inline">Delete Shelf</span>
            </Button>
          </deleteShelfFetcher.Form>
        </div>
      </div>
      {deleteShelfFetcher.state === "idle" &&
        deleteShelfFetcher.formData &&
        (deleteShelfFetcher.formData as unknown as FormData)?.get("shelfId") ===
          shelf.id &&
        deleteShelfFetcher.data?.errors && (
          <ErrorMessage
            variant="error"
            size="sm"
            message={
              deleteShelfFetcher.data.errors.shelfId ||
              deleteShelfFetcher.data.errors.general ||
              "Failed to delete shelf"
            }
          />
        )}
      <div className="p-4 sm:p-6">
        {shelf.items.length === 0 ? (
          <div className="text-center text-gray-500 py-6">
            <p>No items in this shelf yet</p>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => setShowAddModal(true)}
              className="mt-3"
            >
              + Add Item
            </Button>
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-end">
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setShowAddModal(true)}
              >
                + Add Item
              </Button>
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Expiry Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Notes
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {shelf.items.map((item: PantryItem) => {
                    const isExpired =
                      item.expiryDate && new Date(item.expiryDate) < new Date();
                    const isExpiringSoon =
                      item.expiryDate &&
                      new Date(item.expiryDate) <
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) &&
                      !isExpired;

                    const isDeletingItem =
                      deleteItemFetcher.state === "submitting" &&
                      deleteItemFetcher.formData?.get("itemId") === item.id;

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          isExpired
                            ? "bg-red-50"
                            : isExpiringSoon
                              ? "bg-yellow-50"
                              : isDeletingItem
                                ? "opacity-50"
                                : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Created at: {item.createdAt.toLocaleDateString()}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-700">
                          {item.quantity} {item.unit}
                        </td>
                        <td className="px-6 py-4">
                          {item.expiryDate ? (
                            <span
                              className={`text-sm font-medium ${
                                isExpired
                                  ? "text-red-600"
                                  : isExpiringSoon
                                    ? "text-yellow-600"
                                    : "text-gray-700"
                              }`}
                            >
                              {isExpired && "🚨 "}
                              {isExpiringSoon && "⚠️ "}
                              {new Date(item.expiryDate).toLocaleDateString()}
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-700 text-sm">
                          {item.notes || "-"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingItem(item)}
                              disabled={isDeletingItem}
                            >
                              ✏️ Edit
                            </Button>
                            <deleteItemFetcher.Form method="post">
                              <input
                                type="hidden"
                                name="_action"
                                value="deleteItem"
                              />
                              <input
                                type="hidden"
                                name="itemId"
                                value={item.id}
                              />
                              <Button
                                type="submit"
                                variant="danger"
                                size="sm"
                                isLoading={isDeletingItem}
                              >
                                🗑️
                              </Button>
                            </deleteItemFetcher.Form>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {shelf.items.map((item: PantryItem) => {
                const isExpired =
                  item.expiryDate && new Date(item.expiryDate) < new Date();
                const isExpiringSoon =
                  item.expiryDate &&
                  new Date(item.expiryDate) <
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) &&
                  !isExpired;

                const isDeletingItem =
                  deleteItemFetcher.state === "submitting" &&
                  deleteItemFetcher.formData?.get("itemId") === item.id;

                return (
                  <div
                    key={item.id}
                    className={`bg-white border rounded-lg p-4 shadow-sm ${
                      isExpired
                        ? "border-red-200 bg-red-50"
                        : isExpiringSoon
                          ? "border-yellow-200 bg-yellow-50"
                          : isDeletingItem
                            ? "opacity-50"
                            : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-lg">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Created: {item.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium ml-3">
                        {item.category}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <span className="text-gray-500">Quantity:</span>
                        <p className="font-medium">
                          {item.quantity} {item.unit}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Expiry:</span>
                        {item.expiryDate ? (
                          <p
                            className={`font-medium ${
                              isExpired
                                ? "text-red-600"
                                : isExpiringSoon
                                  ? "text-yellow-600"
                                  : "text-gray-700"
                            }`}
                          >
                            {isExpired && "🚨 "}
                            {isExpiringSoon && "⚠️ "}
                            {new Date(item.expiryDate).toLocaleDateString()}
                          </p>
                        ) : (
                          <p className="text-gray-500">-</p>
                        )}
                      </div>
                    </div>

                    {item.notes && (
                      <div className="mb-3">
                        <span className="text-gray-500 text-sm">Notes:</span>
                        <p className="text-sm text-gray-700">{item.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingItem(item)}
                        disabled={isDeletingItem}
                        className="flex-1"
                      >
                        ✏️ Edit
                      </Button>
                      <deleteItemFetcher.Form method="post">
                        <input
                          type="hidden"
                          name="_action"
                          value="deleteItem"
                        />
                        <input type="hidden" name="itemId" value={item.id} />
                        <Button
                          type="submit"
                          variant="danger"
                          size="sm"
                          isLoading={isDeletingItem}
                        >
                          🗑️
                        </Button>
                      </deleteItemFetcher.Form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Add Item Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add New Item"
          size="md"
        >
          <ItemForm
            mode="add"
            shelfId={shelf.id}
            onSuccess={() => setShowAddModal(false)}
            onCancel={() => setShowAddModal(false)}
          />
        </Modal>

        {/* Edit Item Modal */}
        <Modal
          isOpen={!!editingItem}
          onClose={() => setEditingItem(null)}
          title="Edit Item"
          size="md"
        >
          {editingItem && (
            <ItemForm
              mode="edit"
              shelfId={shelf.id}
              item={editingItem}
              onSuccess={() => setEditingItem(null)}
              onCancel={() => setEditingItem(null)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
}

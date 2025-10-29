# Optimistic UI Implementation Guide

## Overview

Optimistic UI has been implemented in the pantry.tsx component to provide immediate visual feedback to users while server operations are in progress.

## What Changed

### 1. **New Interface Type**

```typescript
interface OptimisticShelf extends PantrySelf {
  isOptimistic?: boolean;
}
```

This allows tracking which shelves are being optimistically rendered.

### 2. **State Management**

Two new state variables added to manage optimistic updates:

```typescript
// Tracks shelves being created but not yet saved to server
const [optimisticShelves, setOptimisticShelves] = React.useState<
  OptimisticShelf[]
>([]);

// Tracks shelf IDs currently being deleted
const [deletingShelfIds, setDeletingShelfIds] = React.useState<Set<string>>(
  new Set()
);
```

### 3. **Merged Shelves Calculation**

```typescript
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
```

This intelligently merges server data with optimistic updates.

## Features Implemented

### 1. **Optimistic Create Shelf**

- **When**: User clicks "Add New Shelf"
- **What happens**:
  - A new shelf immediately appears in the UI with ID `optimistic-{timestamp}`
  - Marked with `isOptimistic: true` flag
  - Shows "saving..." indicator next to item count
  - Once server responds, the placeholder is removed

```typescript
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
```

### 2. **Optimistic Delete Shelf**

- **When**: User clicks "Delete Shelf"
- **What happens**:
  - Shelf immediately fades out (opacity-50) and becomes unclickable
  - Added to `deletingShelfIds` set
  - Once server confirms deletion, the shelf is completely removed
  - If deletion fails, the shelf reappears with full opacity

```typescript
React.useEffect(() => {
  if (deleteShelfFetcher.state === "submitting") {
    const formData = deleteShelfFetcher.formData as unknown as FormData;
    const shelfId = formData?.get("shelfId") as string;
    if (shelfId) {
      setDeletingShelfIds((prev) => new Set(prev).add(shelfId));
    }
  }
}, [deleteShelfFetcher.state, deleteShelfFetcher.formData]);
```

### 3. **Improved Shelf Name Editing**

- **When**: User edits shelf name and blurs the input
- **What happens**:
  - Auto-submit on blur if the name changed
  - Input becomes disabled during submission
  - Visual feedback with opacity change
  - Error messages appear if update fails

```typescript
onBlur={(e) => {
  const newValue = e.currentTarget.value.trim();
  const oldValue = shelf.name.trim();

  if (newValue && newValue !== oldValue) {
    const formData = new FormData(e.currentTarget.form!);
    saveShelfFetcher.submit(formData, { method: "post" });
  }
}}
```

## Visual Feedback

### Optimistic Create

- Shelf appears with semi-transparent styling
- Shows "(saving...)" indicator next to item count
- Disappears when server responds

### Optimistic Delete

- Shelf fades to 50% opacity
- Shelf becomes hidden after successful deletion
- Reappears if deletion fails with error message

### Shelf Name Update

- Input field becomes disabled with reduced opacity
- Auto-submits when user leaves the field (if changed)
- Shows error if update fails

## Benefits

1. **Faster User Experience**: Users see changes immediately, no waiting for server
2. **Better Feedback**: Clear visual indicators of pending operations
3. **Error Recovery**: UI automatically reverts changes if operations fail
4. **Smooth Interactions**: Transitions and opacity changes provide visual continuity

## Error Handling

All optimistic updates have proper error handling:

- If a server operation fails, the optimistic state is reverted
- Error messages are displayed to the user
- Users can retry the operation

## Performance

- Uses React.useMemo for efficient shelf merging
- Effects properly manage dependencies to avoid unnecessary updates
- FormData type casting handles React Router type constraints

---

For more details, check the `ShelfCard` component and the main `Pantry` component in `app/routes/app/pantry.tsx`.

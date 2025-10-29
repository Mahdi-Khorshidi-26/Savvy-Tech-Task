import z from "zod";

export const shelfIdSchema = z.object({
  shelfId: z.string().min(1, "Shelf ID is required"),
});

export const saveShelfNameSchema = z.object({
  shelfName: z.string().min(1, "Shelf name cannot be empty"),
  shelfId: z.string().min(1, "Shelf ID is required"),
});

export const itemIdSchema = z.object({
  itemId: z.string().min(1, "Item ID is required"),
});

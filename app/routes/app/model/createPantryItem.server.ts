import { Prisma } from "generated/prisma/client";
import { prisma } from "lib/dbInstance";
import z from "zod";

export const createPantryItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Unit is required"),
  pantrySelfId: z.string().min(1, "Shelf ID is required"),
  expiryDate: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

export default async function createPantryItem(data: {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pantrySelfId: string;
  expiryDate?: string;
  notes?: string;
}) {
  try {
    const createdItem = await prisma.pantryItem.create({
      data: {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        unit: data.unit,
        pantrySelfId: data.pantrySelfId,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        notes: data.notes && data.notes.trim() ? data.notes : null,
      },
    });
    return createdItem;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { errors: { general: error.message } };
    }
    throw error;
  }
}

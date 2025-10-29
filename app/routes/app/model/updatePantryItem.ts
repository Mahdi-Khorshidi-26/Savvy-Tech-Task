import { Prisma } from "generated/prisma/client";
import { prisma } from "lib/dbInstance";
import z from "zod";

export const updatePantryItemSchema = z.object({
  id: z.string().min(1, "Item ID is required"),
  name: z.string().min(1, "Item name is required"),
  category: z.string().min(1, "Category is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  unit: z.string().min(1, "Unit is required"),
  expiryDate: z.string().optional().or(z.literal("")),
  notes: z.string().optional().or(z.literal("")),
});

export default async function updatePantryItem(data: {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  notes?: string;
}) {
  try {
    const updatedItem = await prisma.pantryItem.update({
      where: { id: data.id },
      data: {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        unit: data.unit,
        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
        notes: data.notes && data.notes.trim() ? data.notes : null,
      },
    });
    return updatedItem;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { errors: { general: error.message } };
    }
    throw error;
  }
}

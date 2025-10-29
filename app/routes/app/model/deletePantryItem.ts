import { Prisma } from "generated/prisma/client";
import { prisma } from "lib/dbInstance";

export default async function deletePantryItem(itemId: string) {
  try {
    const deletedItem = await prisma.pantryItem.delete({
      where: { id: itemId },
    });
    return deletedItem;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { errors: { general: error.message } };
    }
    throw error;
  }
}

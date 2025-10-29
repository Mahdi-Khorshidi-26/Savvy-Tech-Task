import { Prisma } from "generated/prisma/client";
import { prisma } from "lib/dbInstance";

export default async function deletePantryShelf(shelfId: string) {
  try {
    const deletedShelf = await prisma.pantrySelf.delete({
      where: {
        id: shelfId,
      },
    });
    return deletedShelf;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { errors: { shelfId: "Shelf not found" } };
      }
      return { errors: { general: error.message } };
    }
    throw error;
  }
}

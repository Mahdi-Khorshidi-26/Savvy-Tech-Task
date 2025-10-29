import { Prisma } from "generated/prisma/client";
import { prisma } from "lib/dbInstance";

export default async function updateShelf({
  shelfId,
  name,
}: {
  shelfId: string;
  name: string;
}) {
  try {
    const updatedShelf = await prisma.pantrySelf.update({
      where: {
        id: shelfId,
      },
      data: {
        name,
      },
    });
    return updatedShelf;
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

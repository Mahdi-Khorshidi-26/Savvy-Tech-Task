import { Prisma } from "generated/prisma/client";
import { prisma } from "lib/dbInstance";

export default async function createPantryShelf(
  name: string = "New Shelf",
  type: string = "custom"
) {
  try {
    const createdShelf = await prisma.pantrySelf.create({
      data: {
        name,
        type,
      },
    });
    return createdShelf;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { errors: { general: error.message } };
    }
    throw error;
  }
}

import { Prisma } from "generated/prisma/client";
import { prisma } from "lib/dbInstance";

export default async function getPantryShelves(query: string | null) {
  try {
    const pantryShelves = await prisma.pantrySelf.findMany({
      where: {
        name: {
          contains: query || "",
          mode: "insensitive",
        },
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });
    return pantryShelves;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return { errors: { general: error.message } };
    }
    throw error;
  }
}

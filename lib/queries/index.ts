import { auth } from "@/auth";
import { cache } from "react";
import { db } from "../db";

export const getLinksAndTagsByUser = cache(async () => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("No autenticado");
    return null;
  }

  try {
    const linkData = await db.links.findMany({
      where: {
        creatorId: currentUser.user?.id,
      },
      include: {
        tags: true,
      },
    });

    const tagsData = await db.tags.findMany({
      where: {
        creatorId: currentUser.user?.id,
      },
    });

    return {
      limit: currentUser.user?.limitLinks,
      links: linkData,
      tags: tagsData,
      userData: currentUser.user,
    };
  } catch (error) {
    console.error("Error mientras el fetching", error);
    throw error;
  }
});

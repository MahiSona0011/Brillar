"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function toggleWishlist(productId: string) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    throw new Error("You must be signed in to save items to your wishlist.");
  }

  const existing = await prisma.wishlistItem.findUnique({
    where: { userId_productId: { userId, productId } },
  });

  if (existing) {
    await prisma.wishlistItem.delete({ where: { id: existing.id } });
    revalidatePath("/account/wishlist");
    return { added: false };
  }

  await prisma.wishlistItem.create({ data: { userId, productId } });
  revalidatePath("/account/wishlist");
  return { added: true };
}

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/lib/data";
import WishlistView from "@/components/account/WishlistView";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    redirect("/auth/signin?callbackUrl=/account/wishlist");
  }

  const saved = await prisma.wishlistItem.findMany({
    where: { userId },
    orderBy: { addedAt: "desc" },
  });

  const products = saved
    .map((s) => PRODUCTS.find((p) => p.id === s.productId))
    .filter((p): p is (typeof PRODUCTS)[number] => Boolean(p));

  return <WishlistView products={products} />;
}

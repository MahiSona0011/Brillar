import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AccountView from "@/components/account/AccountView";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, loyaltyTier: true, loyaltyPoints: true },
  });

  if (!user) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  const latestOrder = await prisma.order.findFirst({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  const recentOrder = latestOrder
    ? {
        id: latestOrder.id,
        createdAt: latestOrder.createdAt.toISOString(),
        status: latestOrder.status,
        total: latestOrder.total,
        itemName: latestOrder.items[0]?.name ?? "Order",
      }
    : null;

  return <AccountView user={user} recentOrder={recentOrder} />;
}

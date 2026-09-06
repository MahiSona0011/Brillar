import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import OrdersList from "@/components/account/OrdersList";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    redirect("/auth/signin?callbackUrl=/account/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <OrdersList
      orders={orders.map((o) => ({
        id: o.id,
        createdAt: o.createdAt.toISOString(),
        status: o.status,
        total: o.total,
        items: o.items.map((i) => ({ name: i.name })),
      }))}
    />
  );
}

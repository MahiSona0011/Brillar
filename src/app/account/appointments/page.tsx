import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AppointmentsView from "@/components/account/AppointmentsView";

export default async function AccountAppointmentsPage() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    redirect("/auth/signin?callbackUrl=/account/appointments");
  }

  const upcoming = await prisma.appointment.findFirst({
    where: { userId, date: { gte: new Date() }, status: { not: "CANCELLED" } },
    orderBy: { date: "asc" },
  });

  return (
    <AppointmentsView
      upcoming={
        upcoming
          ? { id: upcoming.id, type: upcoming.type, date: upcoming.date.toISOString(), status: upcoming.status }
          : null
      }
    />
  );
}

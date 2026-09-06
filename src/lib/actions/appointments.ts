"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type BookableAppointmentType = "IN_STORE" | "VIRTUAL" | "BESPOKE";

function combineDateAndTime(dateStr: string, timeStr: string): Date {
  // timeStr looks like "2:00 PM"
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  const date = new Date(`${dateStr}T00:00:00`);
  if (!match) return date;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hours !== 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;

  date.setHours(hours, minutes, 0, 0);
  return date;
}

export async function bookAppointment(input: {
  type: BookableAppointmentType;
  date: string;
  time: string;
  duration?: number;
  notes?: string;
  location?: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    throw new Error("You must be signed in to book an appointment.");
  }
  if (!input.date || !input.time) {
    throw new Error("Please select a date and time.");
  }

  const appointment = await prisma.appointment.create({
    data: {
      userId,
      type: input.type,
      date: combineDateAndTime(input.date, input.time),
      duration: input.duration ?? 60,
      notes: input.notes,
      location: input.location,
    },
  });

  revalidatePath("/account/appointments");
  return { id: appointment.id };
}

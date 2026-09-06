"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/data";

export interface CheckoutLineItem {
  id: string;
  quantity: number;
  size?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  line1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

/** Recomputes totals server-side from the authoritative product catalog — never trusts client-sent prices. */
function computeTotals(items: CheckoutLineItem[], shippingMethod: "express" | "white-glove") {
  const resolved = items.map((line) => {
    const product = PRODUCTS.find((p) => p.id === line.id);
    if (!product) throw new Error(`Unknown product: ${line.id}`);
    return {
      productId: product.id,
      name: product.name,
      image: product.images[0],
      metal: product.metal,
      size: line.size,
      price: product.price,
      quantity: Math.max(1, Math.floor(line.quantity)),
    };
  });

  const subtotal = resolved.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax = Math.round(subtotal * 0.08);
  const shipping = shippingMethod === "express" ? 95 : 0;
  const total = subtotal + tax + shipping;

  return { resolved, subtotal, tax, shipping, total };
}

export async function createPaymentIntent(
  items: CheckoutLineItem[],
  shippingMethod: "express" | "white-glove"
) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    throw new Error("You must be signed in to check out.");
  }

  const { total } = computeTotals(items, shippingMethod);
  if (total < 1) throw new Error("Your cart is empty.");

  const intent = await stripe.paymentIntents.create({
    amount: total * 100, // cents
    currency: "usd",
    payment_method_types: ["card"],
    metadata: { userId },
  });

  return { clientSecret: intent.client_secret, total };
}

export async function createOrder(input: {
  items: CheckoutLineItem[];
  shippingMethod: "express" | "white-glove";
  address: ShippingAddress;
  stripePaymentId: string;
}) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    throw new Error("You must be signed in to check out.");
  }

  // Confirm the payment actually succeeded before recording the order.
  const paymentIntent = await stripe.paymentIntents.retrieve(input.stripePaymentId);
  if (paymentIntent.status !== "succeeded") {
    throw new Error("Payment has not completed successfully.");
  }

  const { resolved, subtotal, tax, shipping, total } = computeTotals(input.items, input.shippingMethod);

  const address = await prisma.address.create({
    data: {
      userId,
      firstName: input.address.firstName,
      lastName: input.address.lastName,
      line1: input.address.line1,
      city: input.address.city,
      state: input.address.state,
      postalCode: input.address.postalCode,
      country: input.address.country,
    },
  });

  const order = await prisma.order.create({
    data: {
      userId,
      addressId: address.id,
      status: "CONFIRMED",
      subtotal,
      tax,
      shipping,
      total,
      currency: "USD",
      stripePaymentId: input.stripePaymentId,
      items: {
        create: resolved.map((item) => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          metal: item.metal,
        })),
      },
    },
  });

  return { orderId: order.id, total };
}

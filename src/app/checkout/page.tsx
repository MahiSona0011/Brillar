"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ChevronRight, Lock, Check } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/components/cart/CartContext";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { formatPrice } from "@/lib/utils";
import { createPaymentIntent, createOrder } from "@/lib/actions/checkout";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

type Step = "information" | "shipping" | "payment" | "review";

const STEPS: { id: Step; label: string }[] = [
  { id: "information", label: "Information" },
  { id: "shipping",    label: "Shipping" },
  { id: "payment",     label: "Payment" },
  { id: "review",      label: "Review" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  shippingMethod: "express" | "white-glove";
}

const INITIAL_FORM: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  address: "", city: "", state: "", zip: "", country: "US",
  shippingMethod: "express",
};

function StepIndicator({ current }: { current: Step }) {
  const ci = STEPS.findIndex((s) => s.id === current);
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, i) => {
        const done = i < ci;
        const active = i === ci;
        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
                done   ? "bg-[#D4AF37] border-[#D4AF37]" :
                active ? "border-[#D4AF37] bg-transparent" :
                          "border-[#333333] bg-transparent"
              }`}>
                {done ? (
                  <Check size={12} strokeWidth={2} className="text-[#0A0A0A]" />
                ) : (
                  <span className={`font-inter text-[10px] ${active ? "text-[#D4AF37]" : "text-[#444444]"}`}>
                    {i + 1}
                  </span>
                )}
              </div>
              <span className={`font-inter text-[9px] tracking-[0.08em] uppercase ${
                active ? "text-[#D4AF37]" : done ? "text-[#888888]" : "text-[#444444]"
              }`}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px w-12 md:w-20 mb-5 mx-2 transition-all duration-500 ${i < ci ? "bg-[#D4AF37]/40" : "bg-[#222222]"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function InputField({
  label, name, value, onChange, type = "text", placeholder, required,
}: {
  label: string; name: keyof FormData; value: string; onChange: (name: keyof FormData, v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
        {label} {required && <span className="text-[#D4AF37]">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] placeholder:text-[#333333] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
        required={required}
      />
    </div>
  );
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      color: "#F9F9F9",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#444444" },
    },
    invalid: { color: "#C06080" },
  },
};

function CheckoutInner() {
  const router = useRouter();
  const { status } = useSession();
  const { items, subtotal, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();

  const [step, setStep] = useState<Step>("information");
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [preparingPayment, setPreparingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const tax = Math.round(subtotal * 0.08);
  const shipping = form.shippingMethod === "express" ? 95 : 0;
  const total = subtotal + tax + shipping;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/checkout");
    }
  }, [status, router]);

  function update(name: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  async function nextStep() {
    const next = STEPS[stepIndex + 1];
    if (!next) return;

    if (next.id === "payment" && !clientSecret) {
      setPreparingPayment(true);
      setPaymentError("");
      try {
        const lineItems = items.map((i) => ({ id: i.id, quantity: i.quantity, size: i.size }));
        const result = await createPaymentIntent(lineItems, form.shippingMethod);
        setClientSecret(result.clientSecret);
      } catch (err) {
        setPaymentError(err instanceof Error ? err.message : "Could not prepare payment.");
        setPreparingPayment(false);
        return;
      }
      setPreparingPayment(false);
    }

    setStep(next.id);
  }

  async function placeOrder() {
    if (!stripe || !elements || !clientSecret) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    setPaymentError("");

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
        },
      },
    });

    if (error) {
      setPaymentError(error.message ?? "Your card could not be charged.");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status !== "succeeded") {
      setPaymentError("Payment could not be completed.");
      setProcessing(false);
      return;
    }

    try {
      const lineItems = items.map((i) => ({ id: i.id, quantity: i.quantity, size: i.size }));
      const { orderId } = await createOrder({
        items: lineItems,
        shippingMethod: form.shippingMethod,
        address: {
          firstName: form.firstName,
          lastName: form.lastName,
          line1: form.address,
          city: form.city,
          state: form.state,
          postalCode: form.zip,
          country: form.country,
        },
        stripePaymentId: paymentIntent.id,
      });
      clearCart();
      router.push(`/checkout/success?order=${orderId}`);
    } catch (err) {
      setPaymentError(
        err instanceof Error
          ? `Payment succeeded but we could not save your order: ${err.message}. Please contact support with reference ${paymentIntent.id}.`
          : "Payment succeeded but we could not save your order. Please contact support."
      );
      setProcessing(false);
    }
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-32 text-center">
        <p className="font-inter text-xs tracking-[0.1em] uppercase text-[#555555]">Loading…</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-32 text-center">
        <p className="font-cinzel text-xl tracking-[0.08em] text-[#F9F9F9] mb-4">Your cart is empty</p>
        <Link href="/collections" className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] hover:opacity-70 transition-opacity">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-8 md:px-16 py-12 md:py-16">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Link href="/" className="font-cinzel text-xl tracking-[0.12em] text-[#D4AF37]">
          ◆ BRILLAR
        </Link>
        <StepIndicator current={step} />
        <div className="flex items-center gap-1.5 text-[#555555]">
          <Lock size={12} strokeWidth={1.5} />
          <span className="font-inter text-[10px] tracking-[0.08em]">Secure checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        {/* Form */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step === "information" && (
                <div className="space-y-5">
                  <h2 className="font-cinzel text-lg tracking-[0.08em] text-[#F9F9F9] mb-6">
                    Contact information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="First name" name="firstName" value={form.firstName} onChange={update} required />
                    <InputField label="Last name" name="lastName" value={form.lastName} onChange={update} required />
                  </div>
                  <InputField label="Email" name="email" type="email" value={form.email} onChange={update} required />
                  <InputField label="Phone" name="phone" type="tel" value={form.phone} onChange={update} />

                  <h2 className="font-cinzel text-lg tracking-[0.08em] text-[#F9F9F9] mt-8 mb-2">
                    Shipping address
                  </h2>
                  <InputField label="Address" name="address" value={form.address} onChange={update} required />
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="City" name="city" value={form.city} onChange={update} required />
                    <InputField label="State" name="state" value={form.state} onChange={update} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField label="ZIP code" name="zip" value={form.zip} onChange={update} required />
                    <div>
                      <label className="block font-inter text-[10px] tracking-[0.1em] uppercase text-[#888888] mb-2">
                        Country
                      </label>
                      <select
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                        className="w-full bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-3 font-inter text-sm text-[#F9F9F9] focus:outline-none focus:border-[#D4AF37]/50"
                      >
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="IN">India</option>
                        <option value="AE">UAE</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {step === "shipping" && (
                <div className="space-y-4">
                  <h2 className="font-cinzel text-lg tracking-[0.08em] text-[#F9F9F9] mb-6">
                    Shipping method
                  </h2>
                  {[
                    { id: "express", label: "Brillar Express", desc: "1-3 business days · Fully insured", price: 95 },
                    { id: "white-glove", label: "White Glove Delivery", desc: "By appointment · Personal delivery", price: 0 },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center justify-between p-5 border rounded-[4px] cursor-pointer transition-all duration-300 ${
                        form.shippingMethod === method.id
                          ? "border-[#D4AF37]/60 bg-[#D4AF37]/5"
                          : "border-[#2A2A2A] hover:border-[#444444]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          form.shippingMethod === method.id ? "border-[#D4AF37]" : "border-[#444444]"
                        }`}>
                          {form.shippingMethod === method.id && (
                            <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                          )}
                        </div>
                        <div>
                          <p className="font-cinzel text-sm tracking-[0.06em] text-[#F9F9F9]">{method.label}</p>
                          <p className="font-inter text-[10px] tracking-[0.06em] text-[#555555] mt-0.5">{method.desc}</p>
                        </div>
                      </div>
                      <span className="font-poppins font-[300] text-sm text-[#D4AF37]">
                        {method.price === 0 ? "Free" : formatPrice(method.price)}
                      </span>
                      <input
                        type="radio"
                        className="sr-only"
                        checked={form.shippingMethod === method.id}
                        onChange={() => update("shippingMethod", method.id)}
                      />
                    </label>
                  ))}
                </div>
              )}

              {step === "payment" && (
                <div className="space-y-5">
                  <h2 className="font-cinzel text-lg tracking-[0.08em] text-[#F9F9F9] mb-6">
                    Payment details
                  </h2>
                  <div className="bg-[#111111] border border-[#1E1E1E] rounded-[4px] p-4 mb-6">
                    <div className="flex items-center gap-2 text-[#555555]">
                      <Lock size={13} strokeWidth={1.5} />
                      <span className="font-inter text-[10px] tracking-[0.06em]">
                        Your payment is processed securely by Stripe. Card details are never stored on our servers.
                      </span>
                    </div>
                  </div>

                  {preparingPayment && (
                    <p className="font-inter text-xs text-[#888888]">Preparing secure payment form…</p>
                  )}

                  {!preparingPayment && clientSecret && (
                    <div className="bg-[#111111] border border-[#2A2A2A] rounded-[2px] px-4 py-4">
                      <CardElement options={CARD_ELEMENT_OPTIONS} />
                    </div>
                  )}

                  <p className="font-inter text-[9px] tracking-[0.06em] text-[#444444]">
                    Test mode — use card 4242 4242 4242 4242, any future expiry, any CVC.
                  </p>

                  {paymentError && (
                    <p className="font-inter text-[10px] tracking-[0.06em] text-[#C06080] bg-[#6B2A3A]/10 border border-[#6B2A3A]/20 rounded-[2px] px-3 py-2">
                      {paymentError}
                    </p>
                  )}
                </div>
              )}

              {step === "review" && (
                <div className="space-y-6">
                  <h2 className="font-cinzel text-lg tracking-[0.08em] text-[#F9F9F9] mb-6">
                    Review your order
                  </h2>

                  {/* Shipping summary */}
                  <div className="bg-[#111111] border border-[#1E1E1E] rounded-[4px] p-5 space-y-1">
                    <p className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#D4AF37] mb-3">Shipping to</p>
                    <p className="font-inter text-sm text-[#F9F9F9]">{form.firstName} {form.lastName}</p>
                    <p className="font-inter text-[11px] text-[#888888]">{form.address}, {form.city}, {form.state} {form.zip}</p>
                    <p className="font-inter text-[11px] text-[#888888]">{form.email}</p>
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-3 p-3 bg-[#111111] border border-[#1E1E1E] rounded-[4px]">
                        <div className="relative h-14 w-12 flex-shrink-0 rounded-[2px] overflow-hidden bg-[#1A1A1A]">
                          <ImageWithFallback src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                        </div>
                        <div className="flex flex-1 items-center justify-between">
                          <div>
                            <p className="font-cinzel text-xs tracking-[0.06em] text-[#F9F9F9]">{item.name}</p>
                            <p className="font-inter text-[9px] tracking-[0.06em] uppercase text-[#555555] mt-0.5">
                              Qty {item.quantity} {item.size && `· Size ${item.size}`}
                            </p>
                          </div>
                          <span className="font-poppins font-[300] text-sm text-[#D4AF37]">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {paymentError && (
                    <p className="font-inter text-[10px] tracking-[0.06em] text-[#C06080] bg-[#6B2A3A]/10 border border-[#6B2A3A]/20 rounded-[2px] px-3 py-2">
                      {paymentError}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1E1E1E]">
            {stepIndex > 0 ? (
              <button
                onClick={() => setStep(STEPS[stepIndex - 1].id)}
                className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#F9F9F9] transition-colors"
              >
                ← Back
              </button>
            ) : (
              <Link href="/cart" className="font-inter text-[10px] tracking-[0.1em] uppercase text-[#555555] hover:text-[#F9F9F9] transition-colors">
                ← Cart
              </Link>
            )}

            {step === "review" ? (
              <button
                onClick={placeOrder}
                disabled={processing || !stripe}
                className="group relative flex h-12 items-center px-8 gap-2 border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A] disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  {processing ? "Processing…" : "Place order"}
                  {!processing && <Lock size={12} strokeWidth={1.5} />}
                </span>
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={preparingPayment}
                className="group relative flex h-12 items-center px-8 gap-2 border border-[#D4AF37] font-inter text-xs tracking-[0.1em] uppercase text-[#D4AF37] rounded-[2px] overflow-hidden transition-all duration-500 hover:text-[#0A0A0A] disabled:opacity-60"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center gap-2">
                  {preparingPayment ? "Please wait…" : "Continue"}
                  {!preparingPayment && <ChevronRight size={13} strokeWidth={1.5} />}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Order summary sidebar */}
        <aside>
          <div className="sticky top-28 bg-[#111111] border border-[#1E1E1E] rounded-[8px] p-5 space-y-4">
            <h3 className="font-cinzel text-sm tracking-[0.08em] text-[#F9F9F9] pb-4 border-b border-[#1E1E1E]">
              Order Summary
            </h3>

            {/* Items */}
            <div className="space-y-3 max-h-52 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3">
                  <div className="relative h-12 w-10 flex-shrink-0 rounded-[2px] overflow-hidden bg-[#1A1A1A]">
                    <ImageWithFallback src={item.image} alt={item.name} fill sizes="40px" className="object-cover" />
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#333333] font-inter text-[8px] text-[#F9F9F9]">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <p className="font-inter text-[10px] tracking-[0.04em] text-[#888888]">{item.name}</p>
                    <p className="font-inter text-[10px] text-[#F9F9F9]">{formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider-gold" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-inter text-[10px] tracking-[0.06em] text-[#888888]">Subtotal</span>
                <span className="font-inter text-[10px] text-[#F9F9F9]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter text-[10px] tracking-[0.06em] text-[#888888]">Shipping</span>
                <span className="font-inter text-[10px] text-[#F9F9F9]">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-inter text-[10px] tracking-[0.06em] text-[#888888]">Tax</span>
                <span className="font-inter text-[10px] text-[#F9F9F9]">{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="divider-gold" />
            <div className="flex justify-between">
              <span className="font-cinzel text-xs tracking-[0.06em] text-[#F9F9F9]">Total</span>
              <span className="font-poppins font-[300] text-base tracking-[0.04em] text-[#D4AF37]">{formatPrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutInner />
    </Elements>
  );
}

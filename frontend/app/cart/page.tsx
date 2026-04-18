"use client";

import { useEffect, useState } from "react";
import { CartStep } from "@/components/features/cart/CartStep";
import { CheckoutStep } from "@/components/features/cart/CheckoutStep";
import { ConfirmStep } from "@/components/features/cart/ConfirmStep";
import { Button } from "@/components/ui/button";
import { getCart, type CartItemProps } from "@/lib/cart";

export default function CartPage() {
  const [step, setStep] = useState(1);
  const [cart, setCart] = useState<CartItemProps[]>(() => getCart());

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    postalCode: "",
  });

  useEffect(() => {
  const update = () => setCart(getCart());

  window.addEventListener("cart-change", update);
  return () => window.removeEventListener("cart-change", update);
}, []);

  return (
    <div className="container mx-auto w-full mt-24 px-4">
      {/* 🔥 STEPPER */}
      <div className="relative mb-10">
        {/* 🔙 BACK BUTTON (vänster) */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          {step > 1 && (
            <Button variant="ghost" onClick={() => setStep((prev) => prev - 1)}>
              ←
            </Button>
          )}
        </div>

        {/* 🔥 STEPPER (centrerad) */}
        <div className="flex items-center justify-center gap-2">
          <Step
            stepNumber={1}
            label="Korg"
            active={step === 1}
            completed={step > 1}
          />

          <div className="h-px w-10 bg-muted" />

          <Step
            stepNumber={2}
            label="Information"
            active={step === 2}
            completed={step > 2}
          />

          <div className="h-px w-10 bg-muted" />

          <Step stepNumber={3} label="Bekräftelse" active={step === 3} />
        </div>
      </div>

      {/* 🔥 STEPS */}
      {step === 1 && <CartStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <CheckoutStep
          onNext={(data) => {
            setCustomer(data);
            setStep(3);
          }}
        />
      )}
      {step === 3 && <ConfirmStep cart={cart} customer={customer} />}
      <div className="flex justify-start mb-6"></div>
    </div>
  );
}

function Step({
  stepNumber,
  label,
  active,
  completed,
}: {
  stepNumber: number;
  label: string;
  active?: boolean;
  completed?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {/* CIRCLE */}
      <div
        className={`
          w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium
          ${
            active || completed
              ? "bg-green-500 text-white"
              : "bg-muted text-muted-foreground"
          }
        `}
      >
        {completed ? "✓" : stepNumber}
      </div>

      {/* LABEL */}
      <span
        className={`text-sm ${
          active ? "font-medium text-foreground" : "text-muted-foreground"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

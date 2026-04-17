"use client";

import { useState } from "react";
import { CartItem } from "./CartItem";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CartProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

type Props = {
  onNext: () => void;
};

export function CartStep({ onNext }: Props) {
  const [cart, setCart] = useState<CartProduct[]>([
    {
      id: 1,
      name: "Lunchkasse",
      description: "Perfekt för 3 måltider",
      price: 299,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, qty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, qty) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="grid md:grid-cols-1 gap-2 w-full">

      {/* LEFT */}
      <div className="md:col-span-2 space-y-4">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() =>
              updateQuantity(item.id, item.quantity + 1)
            }
            onDecrease={() =>
              updateQuantity(item.id, item.quantity - 1)
            }
            onChange={(value) =>
              updateQuantity(item.id, value)
            }
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      {/* RIGHT */}
      <Card className="">
        <CardContent className="p-6 space-y-4">
          <h2 className="font-semibold">Din beställning</h2>

          <div className="flex justify-between text-sm">
            <span>Totalt</span>
            <span>{total} kr</span>
          </div>

          <Button
            className="w-full"
            onClick={onNext}
            disabled={!cart.length}
          >
            Till kassan
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
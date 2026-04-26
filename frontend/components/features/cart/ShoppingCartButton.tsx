"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { getCartCount, getCartItems } from "@/lib/cart";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

export function ShoppingCartButton() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setCount(getCartCount());
      setItems(getCartItems());
    };

    update();

    window.addEventListener("cart-change", update);
    return () => window.removeEventListener("cart-change", update);
  }, []);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={100} closeDelay={100}>
      {/* 🛒 ICON */}
      <HoverCardTrigger asChild>
        <Link
          href="/cart"
          className="relative inline-flex"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <ShoppingCart className="w-6 h-6" />

          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-brand-orange text-brand-white text-xs px-1.5 rounded-full">
              {count}
            </span>
          )}
        </Link>
      </HoverCardTrigger>

      {/* 🔥 CONTENT */}
      <HoverCardContent
        align="end"
        className="w-72 p-4 space-y-3"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <p className="text-sm font-semibold">Varukorg</p>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Varukorgen är tom
          </p>
        ) : (
          <>
            <div className="space-y-2 max-h-48 overflow-auto">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      x{item.quantity}
                    </p>
                  </div>

                  <p className="font-medium">
                    {item.price * item.quantity} kr
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 flex justify-between font-semibold text-sm">
              <span>Totalt</span>
              <span>{total} kr</span>
            </div>

            {/* 🔥 BUTTON → STÄNG + NAVIGERA */}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
            >
              <Button className="w-full bg-brand-green text-white py-2 rounded-md text-sm">
                Gå till varukorg
              </Button>
            </Link>
          </>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
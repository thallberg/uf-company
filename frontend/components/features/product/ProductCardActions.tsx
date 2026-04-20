"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addToCart } from "@/lib/cart";
import { Check } from "lucide-react";

type Props = {
  badge?: string;
  productId: number;
  name: string;
  price: number;
  isDisabled?: boolean;
};

export function ProductCardActions({
  badge,
  productId,
  name,
  price,
  isDisabled,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleAdd = async () => {
    setStatus("loading");

    try {
      addToCart({
        id: productId,
        name,
        price,
      });

      // ⏳ visa spinner i 1.5s
      setTimeout(() => {
        setStatus("success");

        // ✅ visa check i 1s
        setTimeout(() => {
          setStatus("idle");
        }, 1000);
      }, 500);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div className="flex w-full border rounded-md overflow-hidden">
      <Input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="w-12 h-8 text-center border-0 focus-visible:ring-0"
      />

      <Button
        variant="green"
        onClick={handleAdd}
        disabled={status === "loading" || badge === "Slut" || isDisabled}
        className="flex-1 h-8 w-28 rounded-none border-0 shadow-none"
      >
        {status === "loading" && <Spinner className="size-6" />}

        {status === "success" && <Check className="size-6" />}

        {status === "idle" && "Lägg till"}
      </Button>
    </div>
  );
}

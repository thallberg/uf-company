"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  badge?: string;
  onAddToCart?: (quantity: number) => Promise<void> | void;
};

export function ProductCardActions({
  badge,
  onAddToCart,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async () => {
    if (!onAddToCart) return;

    setLoading(true);

    try {
      await onAddToCart(quantity);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full border rounded-md overflow-hidden">
      <Input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) =>
          setQuantity(Math.max(1, Number(e.target.value)))
        }
        className="w-12 h-10 text-center border-0 focus-visible:ring-0"
      />

      <Button
        variant="green"
        onClick={handleAdd}
        disabled={loading || badge === "Slut"}
        className="flex-1 h-10 rounded-none border-0 shadow-none"
      >
        {loading ? <Spinner className="size-4" /> : "Lägg till"}
      </Button>
    </div>
  );
}
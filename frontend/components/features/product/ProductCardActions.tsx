"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  badge?: string;
  productId: number;
};

export function ProductCardActions({
  badge,
  productId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = async () => {
    setLoading(true);

    try {
      // Simulate API call
      console.log("Adding to cart", { productId, quantity });
    
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
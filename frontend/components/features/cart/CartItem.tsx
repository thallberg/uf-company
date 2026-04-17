"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

type Props = {
  name: string;
  description: string;
  price: number;
  quantity: number;

  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (value: number) => void;
  onRemove: () => void;
};

export function CartItem({
  name,
  description,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onChange,
  onRemove,
}: Props) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 p-4">
        {/* LEFT */}
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center ml-auto">
          {/* GROUP */}
          <div className="flex w-full max-w-[220px] border rounded-md overflow-hidden">
            {/* MINUS */}
            <Button
              variant="ghost"
              onClick={onDecrease}
              className="flex-1 rounded-none border-r"
            >
              -
            </Button>

            {/* INPUT */}
            <Input
              type="number"
              value={quantity}
              onChange={(e) => onChange(Number(e.target.value))}
              className="
        flex-1 text-center border-0 
        focus-visible:ring-0 
        [appearance:textfield]
        [&::-webkit-outer-spin-button]:appearance-none
        [&::-webkit-inner-spin-button]:appearance-none
      "
            />

            {/* PLUS */}
            <Button
              variant="ghost"
              onClick={onIncrease}
              className="flex-1 rounded-none border-l"
            >
              +
            </Button>

            {/* DELETE */}
            <Button
              variant="ghost"
              onClick={onRemove}
              className="flex-1 rounded-none border-l"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>

          {/* PRICE */}
          <div className="font-semibold w-20 text-right ml-4">
            {price * quantity} kr
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

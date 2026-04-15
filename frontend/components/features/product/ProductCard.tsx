"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  badge?: string;
  badgeVariant?: "blue" | "destructive";
  onAddToCart?: () => void;
  salePrice?: number;
};

export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  badge,
  badgeVariant,
  onAddToCart,
  salePrice,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const isOnSale = salePrice != null && salePrice < price;

  const discount =
    salePrice != null ? Math.round(((price - salePrice) / price) * 100) : null;


  // const handleAdd = async () => {
  //   if (!onAddToCart) return;

  //   setLoading(true);

  //   try {
  //     await onAddToCart();
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAdd = async () => {
    if (!onAddToCart) return;

    setLoading(true);

    try {
      // 🔥 fake delay (2 sek)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await onAddToCart();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col py-0 pb-4">
      <div className="relative aspect-square bg-muted max-h-44 overflow-hidden">
        {imageUrl && (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        )}

        {isOnSale && (
          <div className="absolute top-2 left-2">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-xs font-bold bg-brand-yellow text-primary border-2 border-white">
                -{discount}%
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>

      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          {!isOnSale && badge && (
            <Badge variant={badgeVariant ?? "destructive"}>{badge}</Badge>
          )}
        </div>
      </CardHeader>

      {/* 🔥 FLEX FIX */}
      <CardContent className="flex flex-col flex-1 justify-between">
        {/* TOP */}
        <p className="text-sm text-muted-foreground">{description}</p>

        {/* BOTTOM */}
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex flex-col">
            {salePrice ? (
              <>
                <span className="text-xs line-through text-muted-foreground">
                  {price} kr
                </span>
                <span className="font-semibold text-red-500">
                  {salePrice} kr
                </span>
              </>
            ) : (
              <span className="font-semibold">{price} kr</span>
            )}
          </div>

          <div className="flex w-full border rounded-md overflow-hidden">
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => {
                const value = Math.max(1, Number(e.target.value));
                setQuantity(value);
              }}
              className="w-12 h-10 text-center border-0 focus-visible:ring-0"
            />

            <Button
              variant="green"
              onClick={handleAdd}
              disabled={loading || badge === "Slut"}
              className="flex-1 h-10 rounded-none flex items-center justify-center border-0 shadow-none"
            >
              {loading ? (
                <Spinner className="size-4" />
              ) : (
                "Lägg till"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

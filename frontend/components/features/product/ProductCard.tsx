"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  badge?: string;
  badgeVariant?: "blue" | "destructive";
  onAddToCart?: () => void;
};

export function ProductCard({
  name,
  description,
  price,
  imageUrl,
  badge,
  badgeVariant,
  onAddToCart,
}: Props) {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {imageUrl && (
        <div className="relative aspect-square">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>
      )}

      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{name}</CardTitle>
          {badge && (
            <Badge variant={badgeVariant ?? "blue"}>{badge}</Badge>
          )}
        </div>
      </CardHeader>

      {/* 🔥 FLEX FIX */}
      <CardContent className="flex flex-col flex-1 justify-between">
        {/* TOP */}
        <p className="text-sm text-muted-foreground">{description}</p>

        {/* BOTTOM */}
        <div className="flex items-center justify-between mt-4">
          <span className="font-semibold">{price} kr</span>

          <Button variant="green" size="sm" onClick={onAddToCart} disabled={badge === "Slut"}>
            Lägg till
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

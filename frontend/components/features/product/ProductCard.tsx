"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProductCardActions } from "./ProductCardActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  productId: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  badge?: string;
  badgeVariant?: "blue" | "destructive";
  salePrice?: number;

  bundleItems?: {
    productId: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
};

export function ProductCard(props: Props) {
  const {
    name,
    description,
    price,
    imageUrl,
    badge,
    badgeVariant,
    salePrice,
    productId,
    bundleItems,
  } = props;

  const isOnSale = salePrice != null && salePrice < price;

  const [showAllContents, setShowAllContents] = useState(false);

  const hasMoreBundleItems = (bundleItems?.length ?? 0) > 2;
  const displayedBundleItems = bundleItems
    ? showAllContents
      ? bundleItems
      : bundleItems.slice(0, 2)
    : [];

  const discount =
    salePrice != null ? Math.round(((price - salePrice) / price) * 100) : null;

  return (
    <Card className="overflow-hidden h-full flex flex-col py-0 pb-4 w-full max-w-md">
      <div className="relative aspect-square bg-muted max-h-68 overflow-hidden">
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

      <CardContent className="flex-1 mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          {/* 🔵 LEFT */}
          <div className="flex flex-col">
            <CardTitle className="text-base">{name}</CardTitle>

            <p className="text-sm text-muted-foreground mt-1">{description}</p>

            {bundleItems && bundleItems.length > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">Innehåller:</p>
                <ul className="mt-1 space-y-1">
                  {displayedBundleItems.map((item) => (
                    <li key={item.productId}>
                      • {item.product.name} x{item.quantity}
                    </li>
                  ))}
                </ul>

                {hasMoreBundleItems && (
                  <button
                    type="button"
                    onClick={() => setShowAllContents((prev) => !prev)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-foreground hover:text-brand-foreground/80"
                  >
                    {showAllContents ? "Visa mindre" : `Visa ${bundleItems.length - 3} till`}
                    {showAllContents ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            )}
            {/* 🔵 BOTTOM */}
            <div className="mt-auto pt-2">
              <Link href={`/product/${productId}`}>
                <Button variant="link" className="p-0 h-auto text-muted-foreground font-extralight">
                  Läs mer
                </Button>
              </Link>
            </div>
          </div>

          {/* 🟢 RIGHT */}
          <div className="flex flex-col justify-between md:items-end md:text-right h-full">
            {/* 🔵 TOP (mobil = rad, desktop = kolumn) */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full h-full gap-3">
              {/* PRICE */}
              <div>
                {salePrice ? (
                  <>
                    <span className="text-xs line-through text-muted-foreground block">
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

              {/* ACTIONS */}
              <div className="flex items-center gap-2 md:mt-2">
                <ProductCardActions badge={badge} productId={productId} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

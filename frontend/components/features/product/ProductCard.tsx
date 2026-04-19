"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProductCardActions } from "./ProductCardActions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { BadgeProps } from "@/components/ui/badge";

type Props = {
  productId: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  badge?: string;
  badgeVariant?: BadgeProps["variant"];
  salePrice?: number;
  isOutOfStock?: boolean

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
    isOutOfStock,
  } = props;

  const isOnSale = salePrice != null && salePrice < price;

  const discount =
    salePrice != null ? Math.round(((price - salePrice) / price) * 100) : null;

  return (
    <Card
      className={`relative overflow-hidden flex flex-col py-0 pb-4 gap-0 w-60 ${isOutOfStock ? "opacity-60" : ""
        }`}
    >
      {isOutOfStock && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-30">
          <span className="text-white text-sm font-medium text-center px-3">
            Kommer snart in i lager
          </span>
        </div>
      )}
      <div className="relative aspect-square bg-muted max-h-68 overflow-hidden">
        {imageUrl && (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        )}



        {/* SALE BADGE */}
        {isOnSale && (
          <div className="absolute top-2 left-2 z-20">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="text-xs font-bold bg-brand-yellow text-primary border-2 border-white">
                -{discount}%
              </AvatarFallback>
            </Avatar>
          </div>
        )}

        {/* POPULAR / SLUT BADGE */}
        {badge && (
          <div className="absolute top-2 right-2 z-20">
            <Badge className="py-3 px-3" variant={badgeVariant ?? "destructive"}>
              {badge}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className="text-base mt-4">{name}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        <div className="grid grid-cols-1 h-full">
          {/* 🔵 LEFT */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mt-2">
              {description}
            </p>

            {/* 🔵 BOTTOM */}
            <div className="mt-auto pt-2">
              <Link href={`/product/${productId}`}>
                <Button
                  variant="link"
                  className="p-0 h-auto text-muted-foreground font-extralight"
                >
                  Läs mer
                </Button>
              </Link>
            </div>
          </div>

          {/* 🟢 RIGHT */}
          <div className="mt-auto">
            <div className="flex flex-col items-start">
              {/* PRICE */}
              <div className="flex flex-row gap-1 items-center pt-2">
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

              {/* ACTIONS */}
              <div className="flex w-full pt-2">
                <ProductCardActions
                  badge={badge}
                  productId={productId}
                  name={name}
                  price={salePrice ?? price}
                  isDisabled={props.isOutOfStock} // 👈 viktigt
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

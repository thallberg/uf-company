"use client";

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
  } = props;

  const isOnSale = salePrice != null && salePrice < price;

  const discount =
    salePrice != null ? Math.round(((price - salePrice) / price) * 100) : null;

  return (
    <Card className="overflow-hidden h-full flex flex-col py-0 pb-4 gap-0 w-72 md:w-80">
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

      <CardHeader>
        <CardTitle className="text-base mt-4">{name}</CardTitle>
        {!isOnSale && badge && (
          <Badge variant={badgeVariant ?? "destructive"}>{badge}</Badge>
        )}
      </CardHeader>

      <CardContent className="flex-1">
        <div className="grid grid-cols-1 h-full">
          {/* 🔵 LEFT */}
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground mt-2">{description}</p>

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
          <div className="flex flex-col justify-between h-full">
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
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

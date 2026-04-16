import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProductCardActions } from "./ProductCardActions";



type Props = {
  productId: number; 
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  badge?: string;
  badgeVariant?: "blue" | "destructive";
  salePrice?: number;
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
    productId
  } = props;

  const isOnSale = salePrice != null && salePrice < price;

  const discount =
    salePrice != null
      ? Math.round(((price - salePrice) / price) * 100)
      : null;

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
            <Badge variant={badgeVariant ?? "destructive"}>
              {badge}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 justify-between">
        <p className="text-sm text-muted-foreground">{description}</p>

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

          <ProductCardActions
            badge={badge}
            productId={productId}
          />
        </div>
      </CardContent>
    </Card>
  );
}
import Image from "next/image";
import { getProductById } from "@/api/Product.api";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProductCardActions } from "@/components/features/product/ProductCardActions";

type Props = {
  params: { id: string };
};

export default async function ProductPage({ params }: Props) {
  const { id } = params;
  const product = await getProductById(Number(id));

  if (!product) {
    return <div>Produkten hittades inte</div>;
  }

  const isOnSale =
    product.salePrice != null && product.salePrice < product.price;

  const discount =
    product.salePrice != null
      ? Math.round(
          ((product.price - product.salePrice) / product.price) * 100
        )
      : null;

  const bundleItems = product.bundleItems ?? [];

  return (
    <div className="container mx-auto py-10 px-4">

      {/* 🔥 TOP GRID */}
      <div className="grid md:grid-cols-2 gap-10 items-stretch">

        {/* IMAGE */}
        <div className="relative h-full min-h-[400px] bg-muted rounded-lg overflow-hidden">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}

          {isOnSale && (
            <div className="absolute top-3 left-3">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-xs font-bold bg-brand-yellow text-primary border-2 border-white">
                  -{discount}%
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col h-full">

          {/* 🔝 TOP CONTENT */}
          <div className="flex flex-col gap-6">

            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>

              {product.mealsCount != null && product.mealsCount > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {product.mealsCount} måltider
                </p>
              )}

              {product.origin && (
                <p className="text-sm text-muted-foreground">
                  Ursprung: {product.origin}
                </p>
              )}
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-3">
              <p className="text-muted-foreground">
                {product.description}
              </p>

              {product.longDescription && (
                <p className="text-sm whitespace-pre-line">
                  {product.longDescription}
                </p>
              )}
            </div>
          </div>

          {/* 🔥 BOTTOM (pushas ner) */}
          <div className="mt-auto flex flex-col gap-4">

            {/* PRICE */}
            <div className="flex flex-col">
              {isOnSale ? (
                <>
                  <span className="text-sm line-through text-muted-foreground">
                    {product.price} kr
                  </span>
                  <span className="text-2xl font-bold text-red-500">
                    {product.salePrice} kr
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  {product.price} kr
                </span>
              )}
            </div>

            {/* ACTION */}
            <ProductCardActions
              productId={product.id}
              badge={product.stock === 0 ? "Slut" : undefined}
            />

            {/* BADGE */}
            {product.stock === 0 && (
              <Badge variant="destructive" className="w-fit">
                Slut i lager
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 BUNDLE CONTENT */}
      {bundleItems.length > 0 && (
        <div className="mt-12 flex flex-col justify-center items-center">
          <h2 className="text-xl font-semibold mb-4">
            Detta ingår i kassen
          </h2>

          <div className="flex flex-wrap gap-3">
            {bundleItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-2 px-3 py-2 bg-background hover:bg-muted transition"
              >
                {/* ICON */}
                <div className="relative w-8 h-8 bg-muted rounded-full overflow-hidden shrink-0">
                  {item.product.imageUrl && (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                {/* TEXT */}
                <span className="text-xs font-medium">
                  {item.product.name} x{item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
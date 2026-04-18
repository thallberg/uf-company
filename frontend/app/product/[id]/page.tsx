import Image from "next/image";
import { getProductById } from "@/api/Product.api";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProductCardActions } from "@/components/features/product/ProductCardActions";

type Props = {
  params: Promise<{ id: string }>; // 🔥 Next 16
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params; // 🔥 MÅSTE awaitas
  const product = await getProductById(Number(id));

  if (!product) {
    return <div>Produkten hittades inte</div>;
  }

  const isOnSale =
    product.salePrice != null && product.salePrice < product.price;

  const discount =
    product.salePrice != null
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : null;

  const bundleItems = product.bundleItems ?? [];

  return (
    <div className="container mx-auto py-12 px-4 mt-12">
      {/* 🔥 TOP SECTION */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* IMAGE */}
        <div className="relative h-full min-h-[400px] bg-muted rounded-lg overflow-hidden">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
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
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            {(product.mealsCount ?? 0) > 0 && (
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
            <p className="text-muted-foreground">{product.description}</p>

            {product.longDescription && (
              <p className="text-sm whitespace-pre-line">
                {product.longDescription}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 🔥 BOTTOM SECTION */}
      <div className="mt-10 grid md:grid-cols-2 gap-10">
        {/* 🟣 LEFT - bundle */}
        {bundleItems.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex justify-center">Detta ingår i kassen</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3">
              {bundleItems.map((item) => (
                <Badge
                  key={item.productId}
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-3 border-none"
                >
                  <Avatar className="h-10 w-10">
                    {item.product.imageUrl ? (
                      <AvatarImage
                        src={item.product.imageUrl}
                        alt={item.product.name}
                      />
                    ) : (
                      <AvatarFallback className="text-[10px]">
                        {item.product.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <span className="text-xs font-medium">
                    {item.product.name} x{item.quantity}
                  </span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* 🟢 RIGHT - price + action */}
        <div className="flex flex-col h-full">
          {/* 🔝 TOP */}
          <div className="flex flex-col gap-4">
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
                <span className="text-2xl font-bold">{product.price} kr</span>
              )}
            </div>

            {/* BADGE */}
            {product.stock === 0 && (
              <Badge variant="destructive" className="w-fit">
                Slut i lager
              </Badge>
            )}
          </div>

          {/* 🔥 BUTTON (pushas ner) */}
          <div className="mt-auto pt-6">
            <ProductCardActions
              productId={product.id}
              name={product.name}
              price={product.salePrice ?? product.price}
              badge={product.stock === 0 ? "Slut" : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

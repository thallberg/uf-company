import { getProducts } from "@/api/Product.api";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

type Props = {
  limit?: number;
  className?: string;
};

export async function ProductGrid({ limit, className }: Props) {
  const products = await getProducts("Bundle");
  console.log("PRODUCTS:", products); // 👈 här

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className={cn("w-full flex flex-wrap gap-4 justify-center", className)}>
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          salePrice={product.salePrice ?? undefined}
          imageUrl={product.imageUrl}
          badge={product.isPopular && product.stock > 0 ? "Populär" : undefined}
          badgeVariant={product.isPopular ? "default" : undefined}
          bundleItems={product.bundleItems}
          isOutOfStock={product.stock === 0}
        />
      ))}
    </section>
  );
}

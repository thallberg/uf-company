import { getProducts } from "@/api/Product.api";
import { ProductCard } from "./ProductCard";

type Props = {
  limit?: number;
};

export async function ProductGrid({ limit }: Props) {
  const products = await getProducts("Bundle");

  const displayedProducts = limit ? products.slice(0, limit) : products;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {displayedProducts.map((product) => (
        <ProductCard
          key={product.id}
          productId={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          salePrice={product.salePrice ?? undefined}
          imageUrl={product.imageUrl}
          badge={product.stock === 0 ? "Slut" : undefined}
          badgeVariant="destructive"
          bundleItems={product.bundleItems}
        />
      ))}
    </div>
  );
}

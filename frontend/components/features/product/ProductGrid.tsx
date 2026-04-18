import { getProducts } from "@/api/Product.api";
import { ProductCard } from "./ProductCard";

export async function ProductGrid() {
  const products = await getProducts("Bundle");

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {products.map((product) => (
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
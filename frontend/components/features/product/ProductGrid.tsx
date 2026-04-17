import { getProducts } from "@/api/Product.api";
import { ProductCard } from "./ProductCard";

export async function ProductGrid() {
  const products = await getProducts();

  return (
    <div className="flex flex-row flex-wrap gap-6 justify-center h-full w-full">
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
          bundleItems={product.bundleItems} // 🔥 viktigt
        />
      ))}
    </div>
  );
}
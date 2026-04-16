import { getProducts } from "@/api/Product.api";
import { ProductCard } from "./ProductCard";

export async function ProductGrid() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        />
      ))}
    </div>
  );
}
import { getProducts } from "@/api/Product.api";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";
import { Product } from "./Products.types";

export function ProductGrid() {
 const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        console.error(err);
        setError("Kunde inte hämta produkter");
      });
  }, []); // 🔥 VIKTIGT

  if (error) return <p>{error}</p>;
  if (!products.length) return <p>Laddar...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          description={product.description}
          price={product.price}
          salePrice={product.salePrice ?? undefined}
          imageUrl={product.imageUrl}
          badge={product.stock === 0 ? "Slut" : undefined}
          badgeVariant="destructive"
          onAddToCart={() => console.log("Add", product.id)}
        />
      ))}
    </div>
  );
}

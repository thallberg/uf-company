import { ProductGrid } from "@/components/features/product/ProductGrid";

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-12 mt-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-green">Produkter</h1>
        <p className="mt-2 text-muted-foreground">
          Utforska våra lokala produkter och färdiga matkassar.
        </p>
      </div>

      <ProductGrid />
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { createProduct } from "@/api/Product.api";
import { ProductForm } from "@/components/features/admin/ProductForm";

export default function CreateProductPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto py-10 mt-10 max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Ny produkt</h1>

      <ProductForm
        onSubmit={async (data) => {
          await createProduct(data);
          router.push("/admin/products"); 
        }}
      />
    </div>
  );
}
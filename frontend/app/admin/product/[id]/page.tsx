"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  getProductById,
  updateProduct,
  Product,
} from "@/api/Product.api";
import { ProductForm } from "@/components/features/admin/ProductForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditProductPage({ params }: Props) {
  const { id } = use(params); // 🔥 THIS IS THE FIX

  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProductById(Number(id)).then(setProduct);
  }, [id]);

  if (!product) return <p>Laddar...</p>;

  return (
    <div className="container mx-auto py-10 mt-10 max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">Redigera produkt</h1>

      <ProductForm
        initialData={product}
        onSubmit={async (data) => {
          await updateProduct(product.id, data);
          router.push("/admin/products");
        }}
      />
    </div>
  );
}
import { Product } from "@/components/features/product/Products.types"

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://127.0.0.1:5011/api/product", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json()

  return json.data;
}
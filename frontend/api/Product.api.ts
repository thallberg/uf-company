import { ApiFetch } from "./Client.api";

type Product = {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  salePrice?: number | null;
  imageUrl?: string;
  type: "Product" | "Bundle";
  stock: number;
  origin?: string; // ✅ denna saknas
  mealsCount?: number;

  bundleItems?: {
    productId: number;
    quantity: number;
    product: {
      name: string;
      imageUrl?: string;
    };
  }[];
};



export async function getProducts(): Promise<Product[]> {
  const json = await ApiFetch<{ data: Product[] }>(
    "/api/product?type=Bundle"
  );

  return json.data;
}



export async function getProductById(id: number) {
  return ApiFetch<Product>(`/api/product/${id}`);
}
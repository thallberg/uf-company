import { ApiFetch } from "./Client.api";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  salePrice?: number | null;
  imageUrl?: string;
  type: string;
  stock: number;

  bundleItems?: {
    productId: number;
    quantity: number;
    product: {
      name: string;
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
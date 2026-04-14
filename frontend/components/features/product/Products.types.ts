export type Product = {
  id: number
  name: string
  description: string
  price: number
  salePrice?: number | null
  stock: number
  imageUrl?: string
}
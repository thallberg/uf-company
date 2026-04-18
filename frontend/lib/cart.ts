export type CartItemProps = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

const KEY = "cart";

export function getCart(): CartItemProps[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function saveCart(cart: CartItemProps[]) {
  localStorage.setItem(KEY, JSON.stringify(cart));

  // 🔥 uppdatera hela appen
  window.dispatchEvent(new Event("cart-change"));
}

export function addToCart(product: {
  id: number;
  name: string;
  price: number;
}) {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

export function getCartCount() {
  return getCart().reduce((acc, item) => acc + item.quantity, 0);
}

export function getCartItems() {
  return getCart();
}
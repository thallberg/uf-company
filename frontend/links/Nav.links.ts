import { Info, Package, ShoppingBag, User } from "lucide-react";

export const navLinks = [
  {
    label: "Om oss",
    href: "/about",
    icon: Info,
  },
  {
    label: "Produkter",
    href: "/products",
    icon: Package,
  },
  {
    label: "Konto",
    href: "/account",
    icon: User,
  },
];

export const cartLink = {
  label: "Varukorg",
  href: "/cart",
  icon: ShoppingBag,
};

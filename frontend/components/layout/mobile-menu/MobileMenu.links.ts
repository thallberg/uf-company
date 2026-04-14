import { Home, ShoppingBag, Info, User } from "lucide-react";

export const mobileNavLinks = [
  {
    label: "Hem",
    href: "/",
    icon: Home,
  },
  {
    label: "Shop",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    label: "Om oss",
    href: "/about",
    icon: Info,
  },
];

export const mobileBottomLinks = [
  {
    label: "Varukorg",
    href: "/cart",
    icon: ShoppingBag,
  },
  {
    label: "Konto",
    href: "/account",
    icon: User,
  },
];
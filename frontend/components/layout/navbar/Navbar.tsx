"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "../mobile-menu/MobileMenu";
import { useEffect, useState } from "react";
import { getCartCount } from "@/lib/cart";
import { ShoppingCartButton } from "@/components/features/cart/ShoppingCartButton";

export function Navbar() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      setCount(getCartCount());
    };

    update(); // initial load

    window.addEventListener("cart-change", update);
    return () => window.removeEventListener("cart-change", update);
  }, []);

  return (
    <nav className="border-b bg-brand-green h-14 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto text-brand-white flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Button asChild className="text-brand-white" variant="link">
          <Link href="/" className="font-bold text-lg">
            UF Store
          </Link>
        </Button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild className="text-brand-white" variant="link">
            <Link href="/account">
              <User className="!w-6 !h-6" />
            </Link>
          </Button>

          <Button asChild className="text-brand-white" variant="link">
            <ShoppingCartButton />
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileMenu />
          <Button asChild className="text-brand-white" variant="link">
            <ShoppingCartButton />
          </Button>
        </div>
      </div>
    </nav>
  );
}

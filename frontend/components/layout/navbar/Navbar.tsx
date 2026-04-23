"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "../mobile-menu/MobileMenu";
import { ShoppingCartButton } from "@/components/features/cart/ShoppingCartButton";
import { navLinks } from "@/links/Nav.links";

export function Navbar() {
  return (
    <nav className="border-b bg-brand-navbar h-14 sticky top-0 z-50">
      <div className="container mx-auto text-brand-white flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Button asChild className="text-brand-white hover:text-brand-yellow underline-none" variant="link">
          <Link href="/" className="font-bold text-lg">
            UF Store
          </Link>
        </Button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <Button
              key={link.href}
              asChild
              className="text-brand-white hover:text-brand-yellow"
              variant="link"
            >
              <Link href={link.href} aria-label={link.label}>
                <link.icon className="w-6! h-6!" />
              </Link>
            </Button>
          ))}

          <Button asChild className="text-brand-white" variant="link">
            <ShoppingCartButton />
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <MobileMenu />
          <Button asChild className="text-brand-white" variant="link">
            <ShoppingCartButton />
          </Button>
        </div>
      </div>
    </nav>
  );
}

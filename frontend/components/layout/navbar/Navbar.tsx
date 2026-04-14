"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "../mobile-menu/MobileMenu";

export function Navbar() {
  return (
    <nav className="border-b bg-background h-full">
      <div className="container mx-auto flex h-18 items-center justify-between px-4">
        {/* Logo */}
        <Button asChild variant="link">
          <Link href="/" className="font-bold text-lg">
            UF Store
          </Link>
        </Button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="link">
            <Link href="/account">
              <User className="!w-6 !h-6" />
            </Link>
          </Button>

          <Button asChild variant="link">
            <Link href="/cart">
              <ShoppingCart className="!w-6 !h-6" />
            </Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}

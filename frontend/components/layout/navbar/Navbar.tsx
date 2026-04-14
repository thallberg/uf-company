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
        <Link href="/" className="font-bold text-lg">
          UF Store
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="link">
           <User className="!w-6 !h-6" />
          </Button>

          <Button variant="link">
           <ShoppingCart className="!w-6 !h-6" />
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

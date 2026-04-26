"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCartButton } from "@/components/features/cart/ShoppingCartButton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { House } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b bg-brand-navbar h-15 sticky top-0 z-50">
      <div className="container mx-auto text-brand-white flex h-14 items-center justify-between px-4">
        {/* LEFT */}
        <div className="flex items-center gap-2">
          {/* 🔥 sidebar toggle */}
          <SidebarTrigger className="text-brand-white hover:text-brand-yellow" />

          <Button
            asChild
            variant="link"
            className="text-brand-white hover:text-brand-yellow"
          >
            <Link aria-label="Home" href="/" className="p-2 rounded-md bg-white/20 hover:bg-brand-yellow-solid transition">
              <House className="w-5! h-5! text-brand-white"  />
            </Link>
          </Button>
        </div>

        {/* DESKTOP NAV */}
        <div className="md:flex items-center gap-4">
          <ShoppingCartButton />
        </div>
      </div>
    </nav>
  );
}

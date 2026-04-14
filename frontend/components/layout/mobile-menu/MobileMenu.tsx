"use client";

import Link from "next/link";
import { Menu, ShoppingCart, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-6 flex flex-col">
        {/* HEADER */}
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-bold">
            UF Store
          </SheetTitle>
        </SheetHeader>

        {/* NAV LINKS */}
        <div className="mt-6 flex flex-col gap-4 text-lg">
          <SheetClose asChild>
            <Link href="/">Hem</Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/shop">Shop</Link>
          </SheetClose>

          <SheetClose asChild>
            <Link href="/about">Om oss</Link>
          </SheetClose>
        </div>

        {/* PUSH DOWN */}
        <div className="mt-auto space-y-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <ShoppingCart size={18} />
              Varukorg
            </Button>
          </SheetClose>

          <SheetClose asChild>
            <Button variant="outline" className="w-full justify-start gap-2">
              <User size={18} />
              Konto
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

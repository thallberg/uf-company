"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { navLinks } from "@/links/Nav.links";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">
          <Menu className="w-6! h-6! text-brand-white" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-4 flex flex-col">
        
        {/* HEADER */}
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-bold">
            UF Store
          </SheetTitle>
        </SheetHeader>

        {/* NAV */}
        <div className="mt-6 flex flex-col gap-4 text-lg">
          {navLinks.map((link) => (
            <div key={link.href}>
              <SheetClose asChild>
                <Link href={link.href} className="flex items-center gap-2 p-4">
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              </SheetClose>
              <Separator />
            </div>
          ))}
        </div>

      </SheetContent>
    </Sheet>
  );
}

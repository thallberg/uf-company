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

import { mobileBottomLinks, mobileNavLinks } from "./MobileMenu.links";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link">
          <Menu className="!w-6 !h-6 text-brand-white" />
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
          {mobileNavLinks.map((link) => (
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

        {/* BOTTOM */}
        <div className="mt-auto space-y-4">
          {mobileBottomLinks.map((link) => (
            <SheetClose asChild key={link.href}>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-2 hover:bg-brand-green hover:text-brand-white"
              >
                <Link href={link.href}>
                  <link.icon size={18} />
                  {link.label}
                </Link>
              </Button>
            </SheetClose>
          ))}
        </div>

      </SheetContent>
    </Sheet>
  );
}
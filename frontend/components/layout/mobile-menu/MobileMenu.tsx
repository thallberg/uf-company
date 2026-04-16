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
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/lib/Auth";



export function MobileMenu() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="link" className="text-green-100">
          <Menu className="!w-6 !h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72 p-4 flex flex-col">

        {/* HEADER */}
        <SheetHeader>
          <SheetTitle className="text-left text-lg font-bold">
            UF Store
          </SheetTitle>
        </SheetHeader>

        {/* NAV LINKS */}
        <div className="mt-6 flex flex-col gap-4 text-lg">
          {mobileNavLinks.map((link, i) => (
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
          {mobileBottomLinks.map((link) => {
            const href =
              link.label === "Konto"
                ? loggedIn
                  ? "/account"
                  : "/auth"
                : link.href;

            return (
              <SheetClose asChild key={link.href}>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start gap-2 hover:bg-brand-green hover:text-green-100"
                >
                  <Link href={href}>
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                </Button>
              </SheetClose>
            );
          })}
        </div>

      </SheetContent>
    </Sheet>
  );
}
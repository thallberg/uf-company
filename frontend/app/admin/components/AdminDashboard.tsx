"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export function AdminDashboard() {
  return (
    <div className="container mx-auto py-10 space-y-6 mt-12">
      <h1 className="text-2xl font-bold text-brand-green">Admin Panel</h1>

      <div className="grid md:grid-cols-2 gap-4">
        
        {/* PRODUCTS */}
        <Link href="/admin/products">
          <Card className="cursor-pointer hover:shadow-md transition">
            <CardContent className="p-6 space-y-2">
              <h2 className="text-lg font-semibold text-brand-green">Produkter</h2>
              <p className="text-sm text-primary">
                Hantera produkter, skapa, redigera och ta bort
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* USERS (framtid) */}
        <Card className="opacity-50">
          <CardContent className="p-6 space-y-2">
            <h2 className="text-lg font-semibold text-brand-green">Användare</h2>
            <p className="text-sm text-muted-foreground">
              Kommer snart...
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
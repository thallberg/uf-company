"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type Customer = {
  name: string;
  email: string;
  address: string;
  postalCode: string;
};

type Props = {
  cart: CartItem[];
  customer: Customer;
};

export function ConfirmStep({ cart, customer }: Props) {
  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6 space-y-6">

        {/* TITLE */}
        <h2 className="text-xl font-semibold text-center">
          Bekräfta beställning
        </h2>

        {/* 🧾 ORDER ITEMS */}
        <div>
          <h3 className="font-medium mb-2">Din beställning</h3>

          <div className="space-y-2">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>
                  {item.price * item.quantity} kr
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4 font-semibold">
            <span>Totalt</span>
            <span>{total} kr</span>
          </div>
        </div>

        {/* 👤 CUSTOMER INFO */}
        <div>
          <h3 className="font-medium mb-2">Kunduppgifter</h3>

          <div className="text-sm space-y-1 text-muted-foreground">
            <p>{customer.name}</p>
            <p>{customer.email}</p>
            <p>{customer.address}</p>
            <p>{customer.postalCode}</p>
          </div>
        </div>

        {/* BUTTON */}
        <Button className="w-full bg-green-600">
          Bekräfta köp
        </Button>

      </CardContent>
    </Card>
  );
}
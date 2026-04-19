import {
  Leaf,
  Truck,
  Package,
  HeartHandshake,
  Coffee,
  CakeSlice,
  Utensils,
  MapPin,
} from "lucide-react";

export const iconMap = {
  leaf: Leaf,
  truck: Truck,
  package: Package,
  handshake: HeartHandshake,
  coffee: Coffee,
  cake: CakeSlice,
  utensils: Utensils,
  mapPin: MapPin,
} as const;

export type IconName = keyof typeof iconMap;

type Item = {
  icon: IconName;
  title: string;
  description: string;
};

export const itemContent: { items: Item[]} = {
  items: [
    {
      icon: "leaf",
      title: "Närproducerade produkter",
      description: "Noggrant utvalda från lokala producenter",
    },
    {
      icon: "truck",
      title: "Snabb leverans",
      description: "2–5 vardagar direkt hem till dig",
    },
    {
      icon: "package",
      title: "Smidiga leveranser",
      description: "Flera leveransalternativ att välja mellan",
    },
    {
      icon: "handshake",
      title: "Stöd lokalt",
      description: "Varje köp stöttar små producenter",
    },
  ],
};

export const productShowcaseContent: { items: Item[]} = {
  items: [
    {
      icon: "coffee",
      title: "Frukost eller lunch",
      description:
        "Färdiga kassar med lokala råvaror för en enkla och goda variationer.",
    },
    {
      icon: "cake",
      title: "Bak",
      description:
        "Allt du behöver för att baka hemma – noggrant utvalt från lokala producenter.",
    },
  ],
};
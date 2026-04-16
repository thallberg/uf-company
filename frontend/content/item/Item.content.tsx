import { Truck, Package, Leaf, HeartHandshake } from "lucide-react";
import { LucideIcon } from "lucide-react";

type Item = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const itemContent: {
  items: Item[];
} = {
  items: [
    {
      icon: Leaf,
      title: "Närproducerade produkter",
      description: "Noggrant utvalda från lokala producenter",
    },
    {
      icon: Truck,
      title: "Snabb leverans",
      description: "2–5 vardagar direkt hem till dig",
    },
    {
      icon: Package,
      title: "Smidiga leveranser",
      description: "Flera leveransalternativ att välja mellan",
    },
    {
      icon: HeartHandshake,
      title: "Stöd lokalt",
      description: "Varje köp stöttar små producenter",
    },
  ],
};
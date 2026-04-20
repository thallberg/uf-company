import type { IconName } from "@/components/features/item/Item.icons";

type StoreBenefitItem = {
  icon: IconName;
  title: string;
  description: string;
};

export const storeBenefitsContent: { items: StoreBenefitItem[] } = {
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

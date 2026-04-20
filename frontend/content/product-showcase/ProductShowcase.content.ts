import type { IconName } from "@/components/features/item/Item.icons";

type ProductShowcaseItem = {
  icon: IconName;
  title: string;
  description: string;
};

export const productShowcaseContent: {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  items: ProductShowcaseItem[];
} = {
  title: "Vad vi erbjuder",
  description:
    "Gör vardagen enklare och roligare med våra färdiga matkassar. Oavsett om du vill starta dagen med en frukostkasse eller baka något gott hemma, får du allt du behöver – alltid med fokus på lokala och noggrant utvalda råvaror.",
  buttonText: "Visa alla produkter",
  buttonHref: "/products",
  items: [
    {
      icon: "coffee",
      title: "Frukost eller lunch",
      description:
        "Färdiga kassar med lokala råvaror för enkla och goda variationer.",
    },
    {
      icon: "cake",
      title: "Bak",
      description:
        "Allt du behöver för att baka hemma – noggrant utvalt från lokala producenter.",
    },
  ],
};

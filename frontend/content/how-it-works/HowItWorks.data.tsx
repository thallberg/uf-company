import { Leaf, ShoppingCart, User } from "lucide-react";

export const howItWorksData = [
  {
    title: "Lokala råvaror",
    description:
      "Vi väljer noggrant ut produkter från lokala producenter i den mån det är möjligt, alltid baserat på säsong och tillgång. Genom samarbeten med småskaliga företag får du färska råvaror med hög kvalitet.",
    icon: <Leaf className="w-12 h-12" />,
  },
  {
    title: "Beställ din kasse",
    description:
      "Välj en matkasse som passar dig och lägg din beställning enkelt online. Du får en bekräftelse via mail och vi ser till att din kasse levereras med omsorg.",
    icon: <ShoppingCart className="w-12 h-12" />,
  },
  {
    title: "Skapa konto",
    description:
      "Genom att skapa ett konto kan du enkelt hålla koll på dina beställningar, se historik och hantera dina uppgifter för en smidigare upplevelse.",
    icon: <User className="w-12 h-12" />,
  },
];
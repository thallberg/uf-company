import {
  CakeSlice,
  Coffee,
  HeartHandshake,
  Leaf,
  Package,
  Truck,
} from "lucide-react";

export const iconMap = {
  leaf: Leaf,
  truck: Truck,
  package: Package,
  handshake: HeartHandshake,
  coffee: Coffee,
  cake: CakeSlice,
} as const;

export type IconName = keyof typeof iconMap;

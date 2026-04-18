import { type LinkProps } from "next/link";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";

export type FooterLink = {
  label: string;
  href: LinkProps["href"];
};

export const footerLinks: FooterLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Om oss", href: "/about" },
];

export const socialLinks = [
  {
    label: "Email",
    icon: Mail,
    href: "mailto:kontakt@ufstore.se",
  },
  {
    label: "Kontakt",
    icon: Phone,
    href: "/contact",
  },
  {
    label: "Hitta oss",
    icon: MapPin,
    href: "/about",
  },
  {
    label: "Följ oss",
    icon: ExternalLink,
    href: "https://instagram.com",
  },
];

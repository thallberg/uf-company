import { type LinkProps } from "next/link";

export type FooterLink = {
  label: string;
  href: LinkProps["href"];
};

export const footerLinks: FooterLink[] = [
  { label: "Shop", href: "/shop" },
  { label: "Om oss", href: "/about" },
];

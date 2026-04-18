"use client";

import Link from "next/link";
import { footerContent } from "@/content/footer/Footer.content";
import { footerLinks, socialLinks } from "./Footer.links";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-brand-green">
      <div className="py-12 flex flex-col gap-8 sm:flex-row sm:justify-between sm:items-start sm:mx-auto sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-225">
        {/* 🔵 BRAND */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-brand-white">
            {footerContent.title}
          </h3>

          <p className="text-sm text-brand-white/80 leading-relaxed">
            {footerContent.description}
          </p>
        </div>

        {/* 🟢 NAV LINKS */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-brand-white">
            {footerContent.linksTitle}
          </h3>

          <div className="flex flex-col">
            {footerLinks.map((link) => (
              <Link
                key={link.href.toString()}
                href={link.href}
                className="text-sm text-brand-white/80 mt-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* 🟣 CONTACT + SOCIAL */}
        <div className="flex flex-col gap-4 items-center">
          <div className="flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold text-brand-white">
              {footerContent.contactTitle}
            </h3>

            <p className="text-sm text-brand-white/80 mt-1">
              {footerContent.contactEmail}
            </p>
          </div>

          {/* 🔥 SOCIALS */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                <social.icon className="w-5 h-5 text-brand-yellow" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      {/* 🔻 BOTTOM */}
      <div className=" px-4 py-4 text-sm text-center text-brand-white/70">
        {footerContent.footerNote}
      </div>
    </footer>
  );
}

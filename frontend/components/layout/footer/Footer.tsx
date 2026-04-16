import Link from "next/link";

import { Button } from "@/components/ui/button";
import { footerContent } from "@/content/footer/Footer.content";
import { footerLinks } from "./Footer.links";

export function Footer() {
  return (
    <footer className="bg-brand-green">
      <div className="container mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 md:justify-items-center text-center">
        <div className="mx-auto w-full max-w-xs md:mx-0">
          <h3 className="font-semibold mb-2 text-brand-white">{footerContent.title}</h3>
          <p className="text-sm text-accent">{footerContent.description}</p>
        </div>

        <div className="mx-auto w-full max-w-xs md:mx-0">
          <h3 className="font-semibold mb-2 text-brand-white">{footerContent.linksTitle}</h3>
          <div className="text-sm">
            {footerLinks.map((link) => (
              <Button key={link.href.toString()} asChild variant="link" className="w-full p-0 text-brand-white">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-xs md:mx-0">
          <h3 className="font-semibold mb-2 text-brand-white">{footerContent.contactTitle}</h3>
          <p className="text-sm text-brand-white">{footerContent.contactEmail}</p>
        </div>
      </div>

      <div className="border-t px-4 py-4 text-sm text-brand-white">
        {footerContent.footerNote}
      </div>
    </footer>
  );
}

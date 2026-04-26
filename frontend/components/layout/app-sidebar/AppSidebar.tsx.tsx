"use client"

import Link from "next/link"
import { navLinks } from "@/links/Nav.links"
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <>
      <SidebarHeader className="p-4 font-bold text-lg bg-brand-navbar text-brand-white">
        UF Store
      </SidebarHeader>

      <SidebarContent className="bg-brand-green-solid">
        <SidebarMenu className="py-4 gap-2 px-2">
          {navLinks.map((link) => (
            <SidebarMenuItem key={link.href} className="">
              <SidebarMenuButton asChild className="hover:bg-brand-yellow-solid">
                <Link
                  href={link.href}
                  className="flex items-center gap-3 p-2"
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  )
}
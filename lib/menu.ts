import type { MenuItem } from "@/types/menu"

export const MENU_ITEMS: MenuItem[] = [
  { label: "Insights", href: "/about" },
  { label: "Services", href: "/services" ,     children: [
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],},
  { label: "Events", href: "/blog" },
  {
    label: "Careere",
    href: "/careers",
  },
]

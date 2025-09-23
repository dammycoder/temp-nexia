import type { MenuItem } from "@/types/menu"

export const MENU_ITEMS: MenuItem[] = [
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Services", href: "/services" ,     children: [
      { label: "Corporate Support Services", href: "/careers" },
      { label: "Tax Services", href: "/contact" },
      { label: "Audit & Assurance Services", href: "/contactws" },
      { label: "Advisory Services", href: "/as" },
      { label: "Company Secretarial Services", href: "/css" },
    ],},
  { label: "Events", href: "/events" },
  {
    label: "Careers",
    href: "/careers",
  },
]

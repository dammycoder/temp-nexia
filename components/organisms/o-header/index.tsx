"use client"

import React, { useState, useCallback } from "react"
import { Menu, ChevronDown, X } from "lucide-react"
import { MENU_ITEMS } from "@/lib/menu"

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev)
  }, [])

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-xl font-bold">LOGO</div>

        {/* Desktop Nav */}
        <nav aria-label="Global" className="hidden md:flex gap-6">
          {MENU_ITEMS.map((item) => (
            <div key={item.href} className="relative group">
              <a
                href={item.href}
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 transition"
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </a>

              {item.children && (
                <ul className="absolute left-0 mt-2 w-40 rounded-lg border bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <a
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Contact button */}
        <div className="hidden md:block">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
            Contact us
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="md:hidden border-t bg-white px-6 py-4 flex flex-col gap-4"
        >
          {MENU_ITEMS.map((item) => (
            <div key={item.href}>
              <a
                href={item.href}
                className="flex items-center justify-between text-gray-700"
              >
                {item.label}
                {item.children && <ChevronDown className="w-4 h-4" />}
              </a>

              {item.children && (
                <ul className="ml-4 mt-2 space-y-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <a
                        href={child.href}
                        className="block text-gray-600 hover:text-gray-900 transition"
                      >
                        {child.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <button className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
            Contact us
          </button>
        </nav>
      )}
    </header>
  )
}

export default Header

"use client";

import React, { useState, useCallback } from "react";
import { Menu, ChevronDown, X, SearchIcon } from "lucide-react";
import Link from "next/link";
import { MENU_ITEMS } from "@/lib/menu";
import Logo from "@/components/atoms/a-logo";
import { Bounded } from "@/components/bouned";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface HeaderData {
  header?: {
    link?: unknown;
  };
}

interface HeaderProps {
  data?: HeaderData;
}

export function Header({ data }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const segment = useSelectedLayoutSegment();

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Helper function to determine if a link is active
  const isActiveLink = useCallback(
    (href: string) => {
      if (href === "/" && segment === null) return true;
      if (href !== "/" && segment && href.includes(segment)) return true;
      return false;
    },
    [segment],
  );

  return (
    <header className="w-full bg-nexia-dark-teal-100 font-effra">
      <Bounded className="container mx-auto flex items-center justify-between lg:py-4">
        {/* Logo */}
        <Logo />
        {/* Desktop Nav */}
        <div className="flex h-[100px] flex-col items-end justify-between">
          <div className="hidden justify-end lg:flex">
            <Link href="/contact-us" className={cn("cursor-pointer")}>
              <button
                className={cn(
                  "flex w-[150px] cursor-pointer items-center justify-center gap-2 border px-4 py-2 transition-all duration-300",
                  "hover:border-none hover:bg-nexia-light-teal-100 hover:font-bold",
                  isActiveLink("/contact-us")
                    ? "border-nexia-dark-teal-100 bg-white text-nexia-light-teal-100"
                    : "border-white text-white",
                )}
              >
                Contact Us
              </button>
            </Link>
          </div>
          <nav aria-label="Global" className="hidden gap-6 lg:flex">
            {MENU_ITEMS.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-lg font-bold text-white transition ${
                    isActiveLink(item.href)
                      ? "border-b-2 border-nexia-light-teal-100"
                      : ""
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-5 w-5 text-nexia-light-teal-100" />
                  )}
                </Link>

                {item.children && (
                  <ul className="invisible absolute left-0 z-20 mt-2 w-[250px] rounded-lg bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 first:py-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className={`block px-4 py-2 text-lg font-semibold text-nexia-dark-teal-80 transition-all hover:text-nexia-light-teal-80 ${
                            isActiveLink(child.href)
                              ? "border-b-4 border-nexia-light-teal-100"
                              : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <Dialog>
              <DialogTrigger>
                <SearchIcon className="cursor-pointer text-white transition-all hover:text-nexia-light-teal-100" />
              </DialogTrigger>

              <DialogContent className="">
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-4 py-3">
                  <input
                    type="text"
                    placeholder="Type your search here...."
                    className="block w-full border border-nexia-dark-teal-100 p-3"
                  />

                  <Link href="/test" className="flex justify-center">
                    <button className="mx-auto w-fit rounded-md bg-nexia-light-teal-100 px-6 py-2 text-white">
                      Search
                    </button>
                  </Link>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>

    {/* Mobile Menu Toggle */}
<div className="flex items-center gap-3 lg:hidden">
  {/* Hamburger / Close button */}
  <button
    className="text-gray-700"
    aria-label="Toggle menu"
    onClick={toggleMobileMenu}
  >
    {mobileOpen ? (
      <X className="h-6 w-6 text-white" />
    ) : (
      <Menu className="h-7 w-7 text-white" />
    )}
  </button>

  {/* Search only shows when menu is closed */}
  {!mobileOpen && (
    <Dialog>
      <DialogTrigger asChild>
        <button
          aria-label="Search"
          className="cursor-pointer text-white transition-all hover:text-nexia-light-teal-100"
        >
          <SearchIcon className="h-6 w-6" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle></DialogTitle>
        <div className="flex flex-col gap-4 py-3">
          <input
            type="text"
            placeholder="Type your search here...."
            className="block w-full border border-nexia-dark-teal-100 p-3"
          />

          <Link href="/test" className="flex justify-center">
            <button className="mx-auto w-fit rounded-md bg-nexia-light-teal-100 px-6 py-2 text-white">
              Search
            </button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )}
</div>

      </Bounded>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-4 border-t bg-white py-4 lg:hidden"
        >
          {MENU_ITEMS.map((item) => (
            <Bounded key={item.href}>
              {item.children ? (
                <button
                  type="button"
                  onClick={() => toggleSubmenu(item.href)}
                  className={`flex w-full items-center justify-between border-b border-b-gray-100 pb-2 text-left text-nexia-dark-teal-100 ${
                    isActiveLink(item.href)
                      ? "border-l-4 border-nexia-light-teal-100 pl-2"
                      : ""
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openSubmenus[item.href] ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex w-full items-center justify-between border-b border-b-gray-100 pb-2 text-nexia-dark-teal-100 ${
                    isActiveLink(item.href)
                      ? "border-l-4 border-nexia-light-teal-100 pl-2"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              )}

              {item.children && openSubmenus[item.href] && (
                <ul className="mt-2 ml-4 space-y-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`block text-nexia-dark-teal-100 transition hover:text-nexia-light-teal-100 ${
                          isActiveLink(child.href)
                            ? "border-l-4 border-nexia-dark-teal-100 pl-2 font-semibold"
                            : ""
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Bounded>
          ))}

          <Bounded>
            <Link href="/contact-us" className="block">
              <button className="mt-4 w-full rounded-lg bg-nexia-dark-teal-100 px-4 py-2 text-white transition hover:bg-nexia-light-teal-100 md:w-fit">
                Contact us
              </button>
            </Link>
          </Bounded>
        </nav>
      )}
    </header>
  );
};

export default Header;

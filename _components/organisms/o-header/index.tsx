"use client";

import React, { useState, useCallback } from "react";
import { Menu, ChevronDown, X, SearchIcon } from "lucide-react";
import Link from "next/link";
import Logo from "@/_components/atoms/a-logo";
import { Bounded } from "@/_components/bouned";
import { useRouter, usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { cn } from "@/_lib/utils";

type HeaderData = {
  id: number;
  logoLink: {
    id: number;
    image: { data: { attributes: { url: string } } };
    href: string;
  };
  link: Array<{
    id: number;
    href: string;
    text: string;
    external: boolean;
    subLink: {
      id: number;
      href: string;
      title: string;
      external: boolean;
    }[];
  }>;
  cta: {
    id: number;
    href: string;
    text: string;
    external: boolean;
  };
};

interface HeaderProps {
  data?: HeaderData;
}

export function Header({ data }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");  // <-- for search input
  const router = useRouter();

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

const pathname = usePathname();

const isActiveLink = useCallback(
  (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  },
  [pathname]
);

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q.length > 0) {
      router.push(`/search?s=${encodeURIComponent(q)}`);
    }
  };

  return (
    <header className="w-full bg-nexia-dark-teal-100 font-effra relative">
      <Bounded className="flex items-center justify-between lg:py-4 ">
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
                    : "border-white text-white"
                )}
              >
                Contact Us
              </button>
            </Link>
          </div>
          <nav aria-label="Global" className="hidden gap-6 lg:flex">
            {data?.link?.map((item) => (
              <div key={item.href} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 text-lg font-bold text-white transition ${
                    isActiveLink(item.href) ? "border-b-2 border-nexia-light-teal-100" : ""
                  }`}
                >
                  {item.text}
                  {item?.subLink?.length > 0 && (
                    <ChevronDown className="h-5 w-5 text-nexia-light-teal-100" />
                  )}
                </Link>

                {item.subLink?.length > 0 && (
                  <ul className="invisible absolute left-0 z-20 mt-2 w-[250px] rounded-lg bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
                    {item.subLink.map((child) => (
                      <li key={`${item.href}-${child.href}`}>
                        <Link
                          href={child.href}
                          className={`block px-4 py-2 text-lg font-semibold text-nexia-dark-teal-80 transition-all hover:text-nexia-light-teal-80 ${
                            isActiveLink(child.href) ? "" : ""
                          }`}
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Search Dialog */}
            <Dialog>
              <DialogTrigger>
                <SearchIcon className="cursor-pointer text-white transition-all hover:text-nexia-light-teal-100" />
              </DialogTrigger>

              <DialogContent className="!z-200">
                <DialogTitle>Search</DialogTitle>
                <div className="flex flex-col gap-4 py-3">
                  <input
                    type="text"
                    placeholder="Type your search here...."
                    className="block w-full border border-nexia-dark-teal-100 p-3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />

                  <button
                    onClick={handleSearch}
                    className="cursor-pointer mx-auto w-fit rounded-md bg-nexia-light-teal-100 px-6 py-2 text-white"
                  >
                    Search
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          </nav>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            className="text-nexia-gray"
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
          >
            {mobileOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-7 w-7 text-white" />}
          </button>

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
                <DialogTitle>Search</DialogTitle>
                <div className="flex flex-col gap-4 py-3">
                  <input
                    type="text"
                    placeholder="Type your search here...."
                    className="block w-full border border-nexia-dark-teal-100 p-3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />

                  <button
                    onClick={handleSearch}
                    className="mx-auto w-fit rounded-md bg-nexia-light-teal-100 px-6 py-2 text-white"
                  >
                    Search
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </Bounded>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav aria-label="Mobile" className="flex flex-col gap-4 border-t bg-white py-4 lg:hidden">
          {data?.link?.map((item) => (
            <Bounded key={item.href}>
              {item.subLink?.length > 0 ? (
                <button
                  type="button"
                  onClick={() => toggleSubmenu(item.href)}
                  className={`flex w-full items-center justify-between border-b border-b-gray-100 pb-2 text-left text-nexia-dark-teal-100 ${
                    isActiveLink(item.href) ? "border-l-4 border-nexia-light-teal-100 pl-2" : ""
                  }`}
                >
                  {item.text}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openSubmenus[item.href] ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={`flex w-full items-center justify-between border-b border-b-gray-100 pb-2 text-nexia-dark-teal-100 ${
                    isActiveLink(item.href) ? "border-l-4 border-nexia-light-teal-100 pl-2" : ""
                  }`}
                >
                  {item.text}
                </Link>
              )}

              {openSubmenus[item.href] && item.subLink && (
                <ul className="mt-2 ml-4 space-y-2">
                  {item.subLink.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`block text-nexia-dark-teal-100 transition hover:text-nexia-light-teal-100 ${
                          isActiveLink(child.href) ? "pl-2 font-semibold" : ""
                        }`}
                      >
                        {child.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Bounded>
          ))}

          <Bounded>
            <Link href="/contact-us" className="block">
              <button className="whitespace-nowrap mt-4 w-full rounded-lg bg-nexia-dark-teal-100 px-4 py-2 text-white transition hover:bg-nexia-light-teal-100 md:w-fit">
                Contact us
              </button>
            </Link>
          </Bounded>
        </nav>
      )}
    </header>
  );
}

export default Header;

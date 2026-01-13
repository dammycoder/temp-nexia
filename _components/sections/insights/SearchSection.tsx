"use client";

import React, { useEffect, useRef} from "react";
import { Bounded } from "@/_components/bouned";
import { SearchIcon, Loader } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SearchSectionProps = {
  categories: string[];
  searchValue: string;
  categoryValue: string | undefined;
  dateValue: string | undefined;
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string | undefined) => void;
  onDateFilterChange?: (val: string | undefined) => void;
  onSubmit?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
};

const SearchSection = ({
  categories,
  searchValue,
  categoryValue,
  dateValue,
  onSearchChange,
  onCategoryChange,
  onDateFilterChange,
  onSubmit,
  loading,
}: SearchSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const select1Ref = useRef<HTMLDivElement>(null);
  const select2Ref = useRef<HTMLDivElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const viewAllBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.set([searchRef.current, filtersRef.current], { opacity: 0, y: 30 });
      gsap.set(
        [inputRef.current, select1Ref.current, select2Ref.current, searchBtnRef.current, viewAllBtnRef.current],
        { opacity: 0, scale: 0.9 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.to(searchRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          filtersRef.current,
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .to(
          [inputRef.current, select1Ref.current, select2Ref.current, searchBtnRef.current, viewAllBtnRef.current],
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            stagger: 0.1,
          },
          "-=0.2"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded className="py-8" ref={sectionRef}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Search Bar */}
        <div
          ref={searchRef}
          className="flex w-full items-center border-b-[0.5px] border-b-nexia-dark-teal-100 pb-3 focus-within:border-b-nexia-light-teal-100 lg:w-1/2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-none bg-none text-lg text-nexia-dark-teal-100 placeholder:text-xl focus:outline-none"
          />
          <SearchIcon className="text-nexia-dark-teal-100" />
        </div>

        {/* Filters + buttons */}
        <div
          ref={filtersRef}
          className="flex w-full flex-col lg:grid grid-cols-3 gap-4 sm:flex-row lg:w-1/2 lg:items-center"
        >
          {/* Category */}
          <div ref={select1Ref}>
            <Select
              value={categoryValue}
              onValueChange={(val) => onCategoryChange(val === "all" ? undefined : val)}
            >
              <SelectTrigger className="w-full border-nexia-dark-teal-100 bg-white text-nexia-dark-teal-100 rounded-none">
                <SelectValue placeholder="All Content" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
                <SelectItem key="all" value="all">
                  All Content
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div ref={select2Ref}>
            <Select
              value={dateValue}
              onValueChange={(val) => onDateFilterChange?.(val === "all" ? undefined : val)}
            >
              <SelectTrigger className="w-full border-nexia-dark-teal-100 bg-white text-nexia-dark-teal-100 rounded-none">
                <SelectValue placeholder="All Dates" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <button
              ref={searchBtnRef}
              onClick={onSubmit}
              disabled={loading}
              className="flex items-center justify-center w-full bg-nexia-dark-teal-100 px-6 py-2 text-white hover:bg-nexia-dark-teal-200 transition-colors rounded-none disabled:opacity-60"
            >
              {loading ? <Loader className="animate-spin w-5 h-5" /> : "Search"}
            </button>

          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default SearchSection;

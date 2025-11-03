"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bounded } from "@/_components/bouned";
import { SearchIcon } from "lucide-react";
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
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onDateFilterChange?: (val: string) => void;
  onSubmit?: () => void;
  loading?: boolean;
};

const SearchSection = ({
  categories,
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.set([searchRef.current, filtersRef.current], { opacity: 0, y: 30 });
      gsap.set(
        [inputRef.current, select1Ref.current, select2Ref.current, buttonRef.current],
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
          [inputRef.current, select1Ref.current, select2Ref.current, buttonRef.current],
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
        {/* Search bar */}
        <div
          ref={searchRef}
          className="flex w-full items-center border-b-[0.5px] border-b-nexia-dark-teal-100 pb-3 focus-within:border-b-nexia-light-teal-100 lg:w-1/2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearchChange(e.target.value);
            }}
            className="w-full rounded-none bg-none text-lg text-nexia-dark-teal-100 placeholder:text-xl focus:outline-none"
          />
          <SearchIcon className="text-nexia-dark-teal-100" />
        </div>

        {/* Filters */}
        <div
          ref={filtersRef}
          className="flex w-full flex-col lg:grid grid-cols-3 gap-4 sm:flex-row lg:w-1/2 lg:items-center"
        >
          {/* Category */}
          <div ref={select1Ref}>
            <Select
              onValueChange={(val) => {
                setCategory(val);
                onCategoryChange(val);
              }}
            >
              <SelectTrigger className="w-full border-nexia-dark-teal-100 bg-white text-nexia-dark-teal-100 rounded-none">
                <SelectValue placeholder="All Content" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date filter */}
          <div ref={select2Ref}>
            <Select
              onValueChange={(val) => {
                setDate(val);
                onDateFilterChange?.(val);
              }}
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

          <button
            ref={buttonRef}
            onClick={onSubmit}
            disabled={loading}
            className="cursor-pointer bg-nexia-dark-teal-100 px-6 py-2 text-white hover:bg-nexia-dark-teal-200 transition-colors w-full disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>
    </Bounded>
  );
};

export default SearchSection;

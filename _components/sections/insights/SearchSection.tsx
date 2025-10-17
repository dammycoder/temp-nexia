'use client';

import React, { useEffect, useRef } from 'react';
import { Bounded } from '@/_components/bouned';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_components/ui/select';
import { SearchIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type SearchSectionProps = {
  categories: string[];
};

const SearchSection = ({ categories }: SearchSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const select1Ref = useRef<HTMLDivElement>(null);
  const select2Ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([searchRef.current, filtersRef.current], {
        opacity: 0,
        y: 30,
      });

      gsap.set(
        [inputRef.current, select1Ref.current, select2Ref.current, buttonRef.current],
        {
          opacity: 0,
          scale: 0.9,
        },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none',
          once: true,
        },
      });

      tl.to(searchRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
        .to(
          filtersRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.3',
        )
        .to(
          [
            inputRef.current,
            select1Ref.current,
            select2Ref.current,
            buttonRef.current,
          ],
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            once: true,
          },
          '-=0.2',
        );

      // Hover animations for interactive elements
      const searchInput = inputRef.current;
      const searchButton = buttonRef.current;

      if (searchInput) {
        searchInput.addEventListener('focus', () => {
          gsap.to(searchInput, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        searchInput.addEventListener('blur', () => {
          gsap.to(searchInput, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }

      if (searchButton) {
        searchButton.addEventListener('mouseenter', () => {
          gsap.to(searchButton, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        searchButton.addEventListener('mouseleave', () => {
          gsap.to(searchButton, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Bounded className="py-8" ref={sectionRef}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* search */}
        <div
          ref={searchRef}
          className="flex w-full items-center border-b-[0.5px] border-b-nexia-dark-teal-100 pb-3 focus-within:border-b-nexia-light-teal-100 lg:w-1/2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            className="w-full rounded-none bg-none text-lg text-nexia-dark-teal-100 placeholder:text-xl focus:outline-none"
          />
          <SearchIcon className="text-nexia-dark-teal-100" />
        </div>

        {/* selects */}
        <div
          ref={filtersRef}
          className="flex w-full flex-col lg:grid grid-cols-3 gap-4 sm:flex-row lg:w-1/2 lg:items-center"
        >
          {/* All Content Select */}
          <div ref={select1Ref}>
            <Select>
              <SelectTrigger className="w-full border-nexia-dark-teal-100 bg-white text-nexia-dark-teal-100 rounded-none  ">
                <SelectValue placeholder="All Content" />
              </SelectTrigger>
              <SelectContent>
                {categories?.map(category => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* All Dates Select */}
          <div ref={select2Ref}>
            <Select>
              <SelectTrigger className="w-full border-nexia-dark-teal-100 bg-white text-nexia-dark-teal-100 rounded-none ">
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

          {/* Search Button */}
          <button
            ref={buttonRef}
            className=" cursor-pointer bg-nexia-dark-teal-100 px-6 py-2 text-white hover:bg-nexia-dark-teal-200 transition-colors w-full"
          >
            Search
          </button>
        </div>
      </div>
    </Bounded>
  );
};

export default SearchSection;

"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { animations, scrollAnimations } from "@/_lib/animations";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  cta?: {
    text: string;
    href: string;
  };
}

const HeroSection = ({ title, description, cta }: Props) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    // Panel animation
    if (panelRef.current) animations.fadeInRight(panelRef.current);

    // Scroll animation for content
    scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, y: 100 },
        to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      },
      {
        start: "top 70%",
        end: "bottom 30%",
      }
    );
  }, []);

  return (
    <div
      ref={heroRef}
       className="
        relative flex items-center lg:items-end 
        bg-white
        lg:h-[70vh]
        lg:bg-[url('/assets/jpg/bg-about.jpg')]
        lg:bg-cover lg:bg-center lg:bg-no-repeat
        transition-none
      "
    >
      <link rel="preload" href="/assets/jpg/bg-about.jpg" as="image" />

      <div
        ref={contentRef}
        className="z-100 w-full lg:bg-[linear-gradient(to_right,white_0_35%,transparent_35%)]"
      >
        <Bounded className="text-nexia-dark-teal-100 relative z-10 flex w-full items-end py-0">
          <div className="bg-white rounded-tr-4xl flex w-full lg:w-1/2 flex-col justify-center gap-3 px-0 py-8">
            <h1 className="text-2xl">{title}</h1>
            <p className="lg:w-9/10 text-2xl md:text-3xl lg:text-4xl font-bold">
              {description}
            </p>
            <Link
              href="/contact-us"
              className="bg-nexia-light-teal-100 font-effra text-nexia-dark-teal-100 mt-3 flex w-[180px] cursor-pointer items-center justify-center px-2 py-2 transition-all duration-300 hover:scale-105 hover:font-bold"
            >
              Contact Us
            </Link>
          </div>
          <div className="hidden w-1/2 lg:block"></div>
        </Bounded>
      </div>
    </div>
  );
};

export default HeroSection;

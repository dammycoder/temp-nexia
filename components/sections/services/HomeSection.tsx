"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import Image from "next/image";
import { animations, scrollAnimations } from "@/lib/animations";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, y: 100 },
        to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      },
      {
        start: "top 70%",
        end: "bottom 30%"
      }
    );

    // Add parallax effect to background image
    const bgImage = heroRef.current.querySelector('img');
    if (bgImage) {
      animations.parallax(bgImage, -5);
    }
  }, []);

  return (
    <div ref={heroRef} className="relative flex lg:h-[70vh] items-end">
      {/* Background Image */}
      <Image
        src="/assets/jpg/hero-image.jpg"
        alt="About Us Background"
        fill
        priority
      />

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 container lg:px-12 flex h-3/5 w-full py-8 lg:w-1/2 items-center justify-center rounded-tr-4xl bg-white text-nexia-dark-teal-100"
      >
        <Bounded className="container mx-auto flex w-full flex-col gap-3 lg:px-12">
          <h1 className="text-2xl">Services</h1>
          <p className="text-4xl font-bold">
         In Nigeria, Nexia Agbo Abel & Co put themselves at the heart of your business.
          </p>
          <button
            type="button"
            className="mt-3 flex w-[180px] cursor-pointer items-center justify-center bg-nexia-light-teal-100 px-2 py-2 font-effra text-nexia-dark-teal-100 hover:font-bold transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </button>
        </Bounded>
      </div>
    </div>
  );
};

export default HeroSection;

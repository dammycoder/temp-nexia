"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import Image from "next/image";
import { animations, scrollAnimations } from "@/_lib/animations";
import Link from "next/link";


type Prop = {
  title: string;
  description: string;
  cta?: {
    text: string;
    href: string;
  };
}

type Props = {
  data: Prop;
}

const HeroSection = ({data}:Props) => {
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
        src="/assets/jpg/bg-services.jpg"
        alt="About Us Background"
        fill
        priority
        quality={85}
      />

      {/* Content */}
      <div 
        ref={contentRef}
        className="relative z-10 container lg:px-12 flex h-3/5 w-full py-8 lg:w-1/2 items-center justify-center rounded-tr-4xl bg-white text-nexia-dark-teal-100"
      >
        <Bounded className="container mx-auto flex w-full flex-col gap-3 lg:px-12">
          <h1 className="text-2xl">{data?.title}</h1>
          <p className="text-4xl font-bold">
         {data?.description}
          </p>
          <Link
            href={data?.cta?.href ?? "/contact-us"}
            type="button"
            className="mt-3 flex w-[180px] cursor-pointer items-center justify-center bg-nexia-light-teal-100 px-2 py-2 font-effra text-nexia-dark-teal-100 hover:font-bold transition-all duration-300 hover:scale-105"
          >
           {data?.cta?.text}
          </Link>
        </Bounded>
      </div>
    </div>
  );
};

export default HeroSection;

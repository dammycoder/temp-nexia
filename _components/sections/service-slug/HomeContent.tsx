"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import Image from "next/image";
import { animations, scrollAnimations } from "@/_lib/animations";
import { ChevronRight } from "lucide-react";


type Service ={
  title?:string;
  description?:string;
}

type Props = {
  data:Service
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

    const bgImage = heroRef.current.querySelector('img');
    if (bgImage) {
      animations.parallax(bgImage, -5);
    }
  }, []);

  return (
    <div ref={heroRef} className="relative flex lg:h-[70vh] items-center lg:items-end">
      {/* Background Image */}
      <Image
        src="/assets/jpg/hero-image.jpg"
        alt="About Us Background"
        fill
        quality={85}
        priority
        className="hidden lg:block object-cover"
      />

      <div ref={contentRef} className="z-100 w-full lg:bg-[linear-gradient(to_right,white_0_35%,transparent_35%)]">
        <Bounded className="text-nexia-dark-teal-100 relative z-10 flex w-full items-end py-0">
          <div className="bg-white rounded-tr-4xl flex w-full lg:w-1/2 flex-col justify-center gap-3 px-0 py-8">
            <h1 className="text-xl md:text-2xl flex items-center gap-2 ">Services <ChevronRight/> {data?.title}</h1>
            <p className="lg:w-9/10  text-2xl md:text-3xl lg:text-4xl font-bold">
              Combining local expertise with global standards to deliver real results
            </p>
          </div>
          <div className="hidden w-1/2 lg:block"></div>
        </Bounded>
      </div>
    </div>
  );
};

export default HeroSection;
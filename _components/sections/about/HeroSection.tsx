"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import Image from "next/image";
import { animations, scrollAnimations } from "@/_lib/animations";


interface Props {
  title:string;
  description:string;
}


const HeroSection = ({title, description}: Props) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;
    if (panelRef.current) animations.fadeInRight(panelRef.current);


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
    <div ref={heroRef} className="relative flex  lg:h-[70vh] items-center lg:items-end">
      {/* Background Image */}
      <Image
        src="/assets/jpg/bg-about.jpg"
        alt="About Us Background"
        fill
        quality={85}
        priority
        className="hidden lg:block"
      />


<div ref={panelRef}  className="hidden lg:block absolute bottom-0  bg-white h-full lg:h-5/10 w-full lg:w-1/2 z-0 rounded-tr-4xl">

</div>

      {/* Content */}
      <Bounded
        ref={contentRef}
        className="relative z-10 flex  w-full   lg:bg-transparent py-8  items-center  text-nexia-dark-teal-100"
      >

        <div className="flex w-full lg:w-1/2 flex-col gap-3">
          <h1 className="text-2xl">{title}</h1>
          <p className="text-4xl font-bold lg:w-9/10">
           {description}
          </p>
          <button
            type="button"
            className="mt-3 flex w-[180px] cursor-pointer items-center justify-center bg-nexia-light-teal-100 px-2 py-2 font-effra text-nexia-dark-teal-100 hover:font-bold transition-all duration-300 hover:scale-105"
          >
            Contact Us
          </button>
        </div>
      </Bounded>
    </div>
  );
};

export default HeroSection;

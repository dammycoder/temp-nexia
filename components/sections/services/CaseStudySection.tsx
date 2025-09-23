"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import { scrollAnimations } from "@/lib/animations";
import Image from "next/image";

const CaseStudySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

    // Animate title from left
    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, x: -100 },
        to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      },
      {
        start: "top 80%",
        end: "bottom 20%"
      }
    );

    // Animate content from right
    scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, x: 100 },
        to: { opacity: 1, x: 0, duration: 1.0, ease: "power3.out", delay: 0.2 }
      },
      {
        start: "top 80%",
        end: "bottom 20%"
      }
    );
  }, []);

  return (
    <Bounded 
      ref={sectionRef}
      id="international-affliation-about-us" 
      className="flex flex-col gap-3 py-8 lg:flex-row"
    >
      <div className="w-full flex flex-col gap-3 lg:w-1/2">
        <h3 ref={titleRef} className="text-3xl font-bold">
          Case Study
        </h3>

        <h4 className="text-nexia-dark-teal-100 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora eligendi corporis voluptas libero quibusdam voluptatibus, facere hic doloremque nihil expedita repellendus accusamus, excepturi minima maiores ullam eos ipsum doloribus culpa.</h4>
      </div>
      <div ref={contentRef} className="w-full lg:w-1/2">
          <Image src="/assets/jpg/advisory.jpg" alt ="" width={300} height={300} className="w-full h-full object-cover rounded-tr-4xl rounded-bl-4xl"/>
      </div>
    </Bounded>
  );
};

export default CaseStudySection;


"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations } from "@/_lib/animations";


type about = {
  title: string;
  content: string;
}


type Props ={
  data: about
}

const InternationalAffiliationSection = ({data}:Props) => {
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
      <div className="w-full lg:w-1/5">
        <h3 ref={titleRef} className="text-3xl font-bold">
          {data?.title}
        </h3>
      </div>
      <div ref={contentRef} className="w-full lg:w-4/5">
        <p className="text-nexia-gray text-lg">
      {data?.content}
        </p>
      </div>
    </Bounded>
  );
};

export default InternationalAffiliationSection;


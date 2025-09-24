"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import { scrollAnimations } from "@/lib/animations";

type about = {
  title: string;
  content: string;
}

type Props ={
  data: about;
}

const AboutContentSection = ({data}:Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

    // Animate title first
    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      },
      {
        start: "top 80%",
        end: "bottom 20%"
      }
    );

    // Animate content with slight delay
    scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 1.0, ease: "power3.out", delay: 0.2 }
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
      id="about-us-content" 
      className="mt-8 flex flex-col gap-3 py-8"
    >
      <h2 ref={titleRef} className="text-xl font-bold">
  {data?.title}
      </h2>
      <p ref={contentRef} className="text-lg text-nexia-gray">
    {data?.content}
      </p>
    </Bounded>
  );
};

export default AboutContentSection;


"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import { scrollAnimations } from "@/lib/animations";


 interface Props {
  id?: number;
  title?: string;
  content?: string;}


 interface About {
  about?: Props 
}

const AboutSection = ({about}:About) => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aboutRef.current) {
      scrollAnimations.onScroll(
        aboutRef.current,
        {
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        },
        {
          start: "top 80%",
          end: "bottom 20%"
        }
      );
    }
  }, []);

  return (
    <Bounded ref={aboutRef} id="about-us" className="flex py-8">
      <div className="flex flex-col gap-4">
        <p className="font-lg text-lg font-bold text-nexia-dark-teal-100">
          {about?.title}
        </p>
        <p className="text-base text-nexia-dark-teal-100 lg:text-lg xl:text-xl">
         {about?.content}
        </p>
      </div>
    </Bounded>
  );
};

export default AboutSection;

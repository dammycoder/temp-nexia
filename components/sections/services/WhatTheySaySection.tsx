"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import { scrollAnimations } from "@/lib/animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The appointment of Nexia Agbo Abel & Co has brought added quality into the hospital's Financial Statements. The promptness with which the audit was carried out and Financial statement released is commendable. For the first time in the history of the hospital (22 Years of existence), we have the Financial statements Audited and approved by the board within 60 days after the end of the financial year.",
    name: "NISA PREMIER HOSPITAL LTD",
  },
  {
    quote: "I love this company!",
    name: "Jane Doe",
  },
  {
    quote: "The service is amazing!",
    name: "Peter Jones",
  },
];

const WhatTheySaySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      },
      {
        start: "top 80%",
        end: "bottom 20%",
      },
    );
  }, []);

  return (
<div className="flex flex-col">
  <Bounded ref={sectionRef}>
    {/* Heading */}
    <h2
      ref={titleRef}
      className="text-nexia-dark-teal-100 text-lg font-bold"
    >
      What They Say
    </h2>

    {/* Carousel */}
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      
      className="mt-5 w-full"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="text-nexia-dark-teal-100 flex flex-col gap-6">
              {/* Quote */}
              <p className="relative text-nexia-dark-teal-100 border-b pb-4 text-2xl font-bold leading-relaxed md:text-3xl">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author Section */}
              <div className="flex items-center gap-4">

                
                <div>
                  <p className="font-semibold"> -{testimonial.name}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex justify-end gap-2">
        <CarouselPrevious className="text-nexia-dark-teal-100 border-nexia-dark-teal-100 rounded-full border bg-transparent p-2 static translate-y-0" />
        <CarouselNext className="text-nexia-dark-teal-100 border-nexia-dark-teal-100 rounded-full border bg-transparent p-2 static translate-y-0" />
      </div>
    </Carousel>
  </Bounded>
</div>
  );
};

export default WhatTheySaySection;

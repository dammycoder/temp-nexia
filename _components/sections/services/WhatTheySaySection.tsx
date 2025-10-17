"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations } from "@/_lib/animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/_components/ui/carousel";

type Testimonial = {
  id: number;
  name: string;
  description: string;
};

const WhatTheySaySection = ({ data }: { data?: Testimonial[] }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {

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
  }, [data]);

  if (!data || data.length === 0) return null;

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
        {data.map((testimonial) => (
          <CarouselItem key={testimonial.id}>
            <div className="text-nexia-dark-teal-100 flex flex-col gap-6">
              {/* Quote */}
              <p className="relative text-nexia-dark-teal-100 border-b pb-4 text-2xl font-bold leading-relaxed md:text-3xl">
                &quot;{testimonial.description}&quot;
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

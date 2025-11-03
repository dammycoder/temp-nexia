"use client";

import { useEffect, useRef } from "react";
import { animations } from "@/_lib/animations";
import { Bounded } from "@/_components/bouned";

type EventsHeroProps = {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
};

export default function EventsHero({
  title = "Events",
  subtitle = "Stay updated on the latest events and activities happening in our community.",
  backgroundImage = "/assets/webp/pexels-lucianphotography-3566187.webp",
}: EventsHeroProps) {
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    animations.fadeInUp(contentRef.current, { delay: 0.2 });
  }, []);

  return (
    <div className="relative flex lg:h-[70vh] items-center lg:items-end">
      {/* Background Image */}
      <div
        className="hidden lg:block absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
        }}
      />

      <div ref={contentRef} className="z-100 w-full lg:bg-[linear-gradient(to_right,white_0_35%,transparent_35%)]">
        <Bounded className="text-nexia-dark-teal-100 relative z-10 flex w-full items-end py-0">
          <div className="bg-white rounded-tr-4xl flex w-full lg:w-1/2 flex-col justify-center gap-3 px-0 py-8">
            <h1 className="text-2xl">{title}</h1>
            <p className="lg:w-9/10 text-2xl md:text-3xl lg:text-4xl font-bold">
              {subtitle}
            </p>
          </div>
          <div className="hidden w-1/2 lg:block"></div>
        </Bounded>
      </div>
    </div>
  );
}
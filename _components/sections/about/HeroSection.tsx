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
  const heroRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    animations.fadeInUp(contentRef.current, { delay: 0.2 });

    const bgImage = heroRef.current.querySelector("img");
    if (bgImage) {
      animations.parallax(bgImage, -5);
    }
  }, []);

  return (
    <div
      ref={heroRef}
      className="
        relative flex items-center lg:items-end
        bg-white
        lg:h-[70vh]
        lg:bg-cover lg:bg-center lg:bg-no-repeat
        lg:bg-[url('/assets/webp/pexels-lucianphotography-3566187.webp')]
        transition-none
      "
    >
      <link rel="preload" href={backgroundImage} as="image" />

      <div
        ref={contentRef}
        className="z-10 w-full lg:bg-[linear-gradient(to_right,white_0_35%,transparent_35%)]"
      >
        <Bounded className="text-nexia-dark-teal-100 relative z-10 flex w-full items-end py-0">
          <div className="bg-white lg:bg-transparent rounded-tr-4xl flex w-full lg:w-1/2 flex-col justify-center gap-3 px-0 py-8">
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

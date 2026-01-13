"use client";

import * as React from "react";
import Image from "next/image";
import { Bounded } from "@/_components/bouned";
import { useEffect, useRef } from "react";
import { animations, scrollAnimations } from "@/_lib/animations"; // <-- use animations.staggerIn

const servicesData = [
  { id: 1, title: "Corporate Support Services", image: "/assets/webp/pexels-fauxels-3183172.webp" },
  { id: 2, title: "Tax Services", image: "/assets/webp/pexels-n-voitkevich-6863332.webp" },
  { id: 3, title: "Advisory Services", image: "/assets/webp/collaborating-project-modern-office-setting_274679-52976.webp" },
  { id: 4, title: "Audit & Assurance Services", image: "/assets/webp/clipboard-with-text-audit-wood-desk_118454-5574.webp" },
];

const OurServicesSection = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);


  useEffect(() => {
    if (servicesRef.current || !titleRef.current) {

      scrollAnimations.onScroll(
        titleRef.current,
        {
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
        },
        {
          start: "top 80%",
          end: "bottom 20%"
        }
      );

      animations.staggerIn(cardRefs.current, {
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none",
          once: true,

        },
      });
    }
  }, []);

  return (
    <div className="py-12 bg-nexia-dark-teal-100">
      <Bounded ref={servicesRef} id="services" className="flex flex-col gap-8">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-2xl font-bold text-white" ref={titleRef}>Our Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesData.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="relative overflow-hidden rounded-4xl hover:rounded-tl-none hover:rounded-br-none group opacity-0 translate-y-8 transition-all duration-500"
            >
              {/* Fixed height image container */}
              <div className="relative w-full h-[400px] sm:h-[350px] md:h-[380px] lg:h-[400px] xl:h-[420px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 (max-width: 1280px) 33vw,
                 25vw"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 flex items-end p-4 bg-black/40 transition-all duration-300 group-hover:bg-black/50">
                <h3 className="text-2xl md:text-3xl text-white font-semibold leading-snug">
                  {service.title}
                </h3>
              </div>
            </div>
          ))}
        </div>


      </Bounded>
    </div>
  );
};

export default OurServicesSection;

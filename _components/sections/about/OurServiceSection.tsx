"use client";

import * as React from "react";
import Image from "next/image";
import { Bounded } from "@/_components/bouned";
import { useEffect, useRef } from "react";
import { animations, scrollAnimations  } from "@/_lib/animations"; // <-- use animations.staggerIn

const servicesData = [
  { id: 1, title: "Corporate Support Services", image: "/assets/jpg/css.jpg" },
  { id: 2, title: "Tax Services", image: "/assets/jpg/tax.jpg" },
  { id: 3, title: "Audit & Assurance Services", image: "/assets/jpg/audit.jpg" },
  { id: 4, title: "Advisory Services", image: "/assets/jpg/advisory.jpg" },
];

const OurServicesSection = () => {
  const servicesRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);


  useEffect(() => {
    if (servicesRef.current || !titleRef.current ) {

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

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, i) => (
            <div
              key={service.id}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="relative overflow-hidden rounded-4xl hover:rounded-tl-none hover:rounded-br-none group opacity-0 translate-y-8"
            >
              <div className="relative h-100 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex p-4 bg-black/20 transition-all duration-300 group-hover:bg-black/50">
                <h3 className="text-3xl text-white">{service.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </Bounded>
    </div>
  );
};

export default OurServicesSection;

"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Bounded } from "@/components/bouned";
import { scrollAnimations, animations } from "@/lib/animations";

type UsefulLink = {
  id: string;
  text: string;
  href: string;
};


  type Props ={
    data : UsefulLink[];
  }

const UsefulLinksSection = ({data}:Props) => {

  console.log("are you really useful", data)
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Animate section title
    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      },
      { start: "top 80%", end: "bottom 20%" }
    );

    // Animate grid items
    const gridItems = sectionRef.current.querySelectorAll(".useful-link-item");
    if (gridItems.length) {
      animations.staggerIn(Array.from(gridItems), {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, []);

  return (
    <Bounded ref={sectionRef} className="py-12 mb-12">
      <h2
        ref={titleRef}
        className="mb-8 text-2xl font-bold text-nexia-dark-teal-100"
      >
        Useful Links
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="useful-link-item block rounded-bl-4xl rounded-tr-4xl border bg-[#2E53A1] p-5 text-white transition-transform duration-300 hover:scale-105 hover:bg-nexia-dark-teal-100 hover:text-white"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </Bounded>
  );
};

export default UsefulLinksSection;

"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SubscribeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  // const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([contentRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
      });

      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 0,
        x: -30,
      });

      // Staggered animation for subscribe section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Button hover animations
      const subscribeButton = buttonRef.current;

      if (subscribeButton) {
        subscribeButton.addEventListener("mouseenter", () => {
          gsap.to(subscribeButton, {
            scale: 1.05,
            y: -2,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        subscribeButton.addEventListener("mouseleave", () => {
          gsap.to(subscribeButton, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        subscribeButton.addEventListener("mousedown", () => {
          gsap.to(subscribeButton, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out",
          });
        });

        subscribeButton.addEventListener("mouseup", () => {
          gsap.to(subscribeButton, {
            scale: 1.05,
            duration: 0.1,
            ease: "power2.out",
          });
        });
      }

      // Floating animation for the section
      gsap.to(sectionRef.current, {
        y: -10,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
<div className="px-0 lg:px-[100px]">
<Bounded className="py-8 bg-gray-100 mb-10 " ref={sectionRef}>
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div ref={contentRef} className="text-nexia-dark-teal-100">
          <p ref={titleRef} className="text-2xl lg:text-3xl">
            Want to receive notifications of new insights?
          </p>
          <p ref={subtitleRef} className="text-lg lg:text-2xl font-light">
            Click the button to subscribe to email updates
          </p>
        </div>

        <button 
          ref={buttonRef}
          className="flex items-center justify-center cursor-pointer w-full border border-nexia-dark-teal-100 text-nexia-dark-teal-100 px-6 py-2 hover:bg-nexia-dark-teal-200 transition-colors lg:w-fit"
        >
          Subscribe
        </button>
      </div>
    </Bounded>
</div>
  );
};

export default SubscribeSection;


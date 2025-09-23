"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Bounded } from "@/components/bouned";
import Image from "next/image";
import { scrollAnimations } from "@/lib/animations";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type HeroItem = {
  title?: string;
  description?: string;
  cta?: {
    href?: string;
    text?: string;
    external?: boolean;
  };
};

type Props = {
  data: HeroItem[];
};

const HeroSection = ({ data }: Props) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  // Initialize autoplay plugin with useRef to prevent re-creation on re-renders
  const plugin = useRef(
    Autoplay({ 
      delay: 5000, 
      stopOnInteraction: true,
      playOnInit: true 
    })
  );

  // Get carousel API and set up event listeners
  useEffect(() => {
    if (!api) return;

    const updateState = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    // Set initial state
    updateState();

    // Listen for select events
    api.on("select", updateState);

    // Cleanup function
    return () => {
      api.off("select", updateState);
    };
  }, [api]);

  // Progress bar animation management
  useEffect(() => {
    if (!api || data.length <= 1) return;

    // Clear any existing interval
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Reset progress when slide changes
    setProgress(0);

    // Create new progress interval
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const increment = 100 / 50; // 5000ms / 100ms intervals = 50 intervals
        const newProgress = prev + increment;
        
        if (newProgress >= 100) {
          // Auto-advance to next slide when progress reaches 100%
          setTimeout(() => api.scrollNext(), 100);
          return 0;
        }
        return newProgress;
      });
    }, 100);

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [api, current, data.length]);

  // Scroll animations
  useEffect(() => {
    if (heroRef.current) {
      const heroContent = heroRef.current.querySelector('.hero-content');
      if (heroContent) {
        scrollAnimations.onScroll(
          heroContent,
          {
            from: { opacity: 0, y: 100 },
            to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
          },
          {
            start: "top 70%",
            end: "bottom 30%"
          }
        );
      }
    }
  }, []);

  const handleCtaClick = useCallback((cta: HeroItem['cta']) => {
    if (!cta?.href) return;
    
    if (cta.external) {
      window.open(cta.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = cta.href;
    }
  }, []);

  // Manual slide navigation handlers
  const handlePrevious = useCallback(() => {
    api?.scrollPrev();
    plugin.current?.stop();
    plugin.current?.play(); // Restart autoplay after manual interaction
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
    plugin.current?.stop();
    plugin.current?.play(); // Restart autoplay after manual interaction
  }, [api]);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div ref={heroRef} className="relative flex lg:h-[70vh] items-end">
      <Image 
        src="/assets/jpg/hero-image.jpg" 
        alt="Hero background" 
        fill 
        className="object-cover"
        priority
      />
      
      {/* White Container with Carousel */}
      <div className="hero-content relative z-10 flex w-full h-full lg:h-7/10 lg:w-5/10 items-center rounded-tr-4xl bg-white lg:px-12 pb-3">
        <Carousel
          setApi={setApi}
          plugins={data.length > 1 ? [plugin.current] : []}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
            watchDrag: data.length > 1, // Disable drag if only one item
          }}
        >
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index}>
                <Bounded className="max-auto container flex flex-col gap-4 lg:px-12 py-4">
                  <p className="text-xl text-nexia-dark-teal-100">
                    {item.description || "TRI Conference Dubai 25th-27th September"}
                  </p>
                  <h1 className="text-3xl leading-13 font-bold text-nexia-dark-teal-100 md:text-4xl xl:text-5xl">
                    {item.title || "Find out the latest thinking on turnaround, restructuring and insolvency"}
                  </h1>
                  
                  {item.cta && (
                    <button
                      type="button"
                      onClick={() => handleCtaClick(item.cta)}
                      className="items-center flex w-[180px] cursor-pointer justify-center bg-nexia-light-teal-100 px-2 py-2 font-effra text-nexia-dark-teal-100 hover:bg-nexia-dark-teal-100 hover:text-white transition-colors"
                    >
                      {item.cta.text || "Discover more"}
                    </button>
                  )}
                </Bounded>
              </CarouselItem>
            ))}
          </CarouselContent>

          <Bounded className="mt-4">
            {data.length > 1 && (
              <div className="flex items-center">
                <div className="lg:ml-2 w-1/5 px-3 py-1 text-nexia-dark-teal-100 text-sm font-medium">
                  {current} / {count}
                </div>

                <div className="w-full h-1 bg-nexia-dark-teal-100/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-nexia-light-teal-100 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex gap-2 ml-3">
                  <CarouselPrevious 
                    onClick={handlePrevious}
                    className="translate-y-0 left-0 relative backdrop-blur-sm hover:bg-nexia-light-teal-100/30 border-nexia-dark-teal-100/30 text-nexia-dark-teal-100 hover:text-nexia-dark-teal-100" 
                  />
                  <CarouselNext 
                    onClick={handleNext}
                    className="translate-y-0 left-0 top-0 relative backdrop-blur-sm hover:bg-nexia-light-teal-100/30 border-nexia-dark-teal-100/30 text-nexia-dark-teal-100 hover:text-nexia-dark-teal-100" 
                  />
                </div>
              </div>
            )}
          </Bounded>
        </Carousel>
      </div>
    </div>
  );
};

export default HeroSection;
"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Bounded } from "@/components/bouned";
import { useEffect, useRef } from "react";
import { scrollAnimations } from "@/lib/animations";

// Sample insights data
const insightsData = [
  {
    id: 1,
    title:
      "Tax reliefs adopted in Hungary: corporate income tax payable in a foreign currency",
    date: "17th January",
    image: "/assets/jpg/Business-Services-Image.jpeg",
    category: "Tax",
  },
  {
    id: 2,
    title:
      "Digital transformation in accounting: embracing the future of financial services",
    date: "15th January",
    image:
      "/assets/jpg/depositphotos_127543442-stock-photo-aerial-photography-on-top-of.jpg",
    category: "Advisory",
  },
  {
    id: 3,
    title: "Audit best practices for small and medium enterprises in 2024",
    date: "12th January",
    image: "/assets/jpg/section-image.jpg",
    category: "Audit",
  },
  {
    id: 4,
    title: "International tax compliance: navigating cross-border regulations",
    date: "10th January",
    image: "/assets/jpg/nexia-home.jpg",
    category: "Tax",
  },
  {
    id: 5,
    title: "Financial advisory services for growing businesses",
    date: "8th January",
    image: "/assets/jpg/hero-image.jpg",
    category: "Advisory",
  },
];

export function RelatedInsightsSection() {
  const [api, setApi] = React.useState<CarouselApi>();
  const insightsRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on("select", () => {
      // Handle carousel selection if needed
    });
  }, [api]);

  useEffect(() => {
    if (insightsRef.current) {
      scrollAnimations.onScroll(
        insightsRef.current,
        {
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        },
        {
          start: "top 80%",
          end: "bottom 20%",
        },
      );
    }
  }, []);

  return (
    <Bounded
      ref={insightsRef}
      id="insights"
      className="flex flex-col gap-5 py-8 lg:flex-row"
    >
      <div className="flex w-full flex-col gap-5 lg:w-2/5">
        <h2 className="text-4xl font-bold text-nexia-dark-teal-100">
          Related Insights
        </h2>
        <p className="text-lg font-normal text-nexia-dark-teal-100">
          Stay informed with the latest perspectives from our experts.
        </p>
        <button
          type="button"
          className="w-fit cursor-pointer border border-nexia-dark-teal-100 px-6 py-2 font-medium text-nexia-dark-teal-100 transition-colors hover:bg-nexia-dark-teal-100 hover:text-white"
        >
          Explore More Insights
        </button>
      </div>

      {/* Carousel */}
      <div className="w-full lg:w-3/5">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {insightsData.map((insight) => (
              <CarouselItem
                key={insight.id}
                className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <div className="overflow-hidden duration-300">
                  <div className="relative h-60 w-full">
                    <Image
                      src={insight.image}
                      alt={insight.title}
                      fill
                      className="rounded-tr-4xl rounded-bl-4xl object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rounded-none"
                    />
                  </div>
                  <div className="mt-4 bg-white">
                    <h3 className="mb-2 text-lg font-bold text-nexia-dark-teal-100">
                      {insight.title}
                    </h3>
                    <p className="text-base text-nexia-gray">{insight.date}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex gap-2">
            <CarouselPrevious className="relative top-0 left-0 translate-x-0 translate-y-0" />
            <CarouselNext className="relative top-0 left-0 translate-x-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </Bounded>
  );
}

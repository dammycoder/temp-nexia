"use client";

import * as React from "react";
import Image from "next/image";
import { getStrapiMedia } from "@/_lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/_components/ui/carousel";
import { Bounded } from "@/_components/bouned";
import { useEffect, useRef } from "react";
import { scrollAnimations } from "@/_lib/animations";
import Link from "next/link";


type Insight = {
  id?: number;
  title?: string;
  image?: string | { url?: string; alternativeText?: string };
  slug?: string;
  contents?: string;
  date?: string;
  description?: string;
  category?: string;
};

type Props = {
  data?: {
    id?: number;
    title?: string;
    subTitle?: string;
    cta?: {
      text: string;
      href: string;
      external?: boolean;
    };
    insights?: Insight[];
  };
};

export function RelatedInsightsCarousel({ data }: Props) {
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
        <h2 className="text-nexia-dark-teal-100 text-4xl font-bold">
          {data?.title}
        </h2>
        <p className="text-nexia-dark-teal-100 text-lg font-normal">
          {data?.subTitle}
        </p>
      
      <Link href={`${data?.cta?.href}`}>
        <button
          type="button"
          className="border-nexia-dark-teal-100 text-nexia-dark-teal-100 hover:bg-nexia-dark-teal-100 w-fit cursor-pointer border px-6 py-2 font-medium transition-colors hover:text-white"
        >
          {data?.cta?.text}
        </button>
      </Link>
      </div>

      {/* Carousel */}
      <div className="w-full lg:w-3/5">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {data?.insights?.map((insight) => (
              <CarouselItem
                key={insight.id}
                className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <div className="overflow-hidden duration-300">
                  <div className="relative h-60 w-full">
                    <Image
                      src={
                        typeof insight?.image === "string"
                          ? getStrapiMedia((insight?.image ?? null) as string | null) || "/assets/jpg/placeholder.jpg"
                          : getStrapiMedia((insight?.image?.url ?? null) as string | null) || "/assets/jpg/placeholder.jpg"
                      }
                      alt={
                        (typeof insight?.image !== "string" && insight?.image?.alternativeText) ||
                        insight?.title ||
                        ""
                      }
                      fill
                      className="rounded-tr-4xl rounded-bl-4xl object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rounded-none"
                    />
                  </div>
                  <div className="mt-4 bg-white">
                    <h3 className="text-nexia-dark-teal-100 mb-2 text-lg font-bold">
                      {insight?.title}
                    </h3>
                    <p className="text-nexia-gray text-base">{insight?.date}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex gap-2">
            <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0" />
            <CarouselNext className="relative left-0 top-0 translate-x-0 translate-y-0" />
          </div>
        </Carousel>
      </div>
    </Bounded>
  );
}

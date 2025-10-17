"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
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
import { getStrapiMedia } from "@/_lib/utils";

// Define the type for insights
export type Insight = {
  id: number;
  documentId: string;
  slug: string;
  contents: string;
  datePublished: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  title: string;
  image:{
    url:string;
    alternativeText:string;
  }
};

type RelatedInsightsSectionProps = {
  insights: Insight[];
};

export function RelatedInsightsSection({ insights }: RelatedInsightsSectionProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const insightsRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!api) return;
    api.on("select", () => {
      // could track selected index if needed
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
        <Link
          href="/insights"
          className="w-fit cursor-pointer border border-nexia-dark-teal-100 px-6 py-2 font-medium text-nexia-dark-teal-100 transition-colors hover:bg-nexia-dark-teal-100 hover:text-white"
        >
          Explore More Insights
        </Link>
      </div>

      {/* Carousel */}
      <div className="w-full lg:w-3/5">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {insights?.map((insight) => (
              <CarouselItem
                key={insight.id}
                className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <div className="overflow-hidden duration-300 group">
                  <div className="relative h-60 w-full">
                    <Image
                      src={getStrapiMedia(insight?.image?.url ?? null) ?? "/assetsjpg/profile-placeholder.svg"} 
                      alt={insight.title}
                      fill
                      className="rounded-tr-4xl rounded-bl-4xl object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rounded-none"
                    />
                  </div>
                  <div className="mt-4 bg-white">
                    <h3 className="mb-2 text-lg font-bold text-nexia-dark-teal-100 line-clamp-2">
                      {insight.title}
                    </h3>
                    <p className="text-base text-nexia-gray">
                      {new Date(insight.datePublished).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
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

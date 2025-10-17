"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations, animations } from "@/_lib/animations";
import { getStrapiMedia } from "@/_lib/utils";

type Insight = {
  id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    contents: string;
    datePublished: string;
      image: {
        url: string;
        formats?: {
          thumbnail?: { url: string | null};
          small?: { url: string | null };
          medium?: { url: string | null };
          large?: { url: string | null };
        };
  };
  };

type InsightsSectionProps = {
  insights: Insight[];
};

const InsightsSection = ({ insights }: InsightsSectionProps) => {

  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Animate title
    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      },
      {
        start: "top 80%",
        end: "bottom 20%",
        once:true
      },
    );

    // Animate cards in stagger
    if (cardRefs.current.length) {
      animations.staggerIn(cardRefs.current, {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      cardRefs.current.forEach((card) => {
        const img = card.querySelector("img");
        if (img) animations.hoverScale(img, 1.05);
      });
    }
  }, [insights]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      <Bounded ref={sectionRef} className="mb-10 py-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h2
            className="text-2xl font-bold text-nexia-dark-teal-100"
            ref={titleRef}
          >
            Insights{" "}
          </h2>
        </div>
        <div ref={gridRef} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {insights.map((item, index) => (
            <Link
              key={item.id}
              href={`/insights/${item.slug}`}
              className="group"
            >
              <div
                ref={(el) => {
                  if (el) cardRefs.current[index] = el;
                }}
                className="h-full overflow-hidden rounded-sm transition-shadow duration-200"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={getStrapiMedia(item?.image?.formats?.medium?.url ?? null) ?? "/assets/png/abel.png"}
                    alt={item?.title}
                    fill
                    className="rounded-tr-4xl rounded-bl-4xl object-cover"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-sm text-nexia-dark-teal-100">
                    <span className="tracking-wide uppercase font-bold">
                      {item?.category}
                    </span>
                    <span className="font-light">{formatDate(item?.datePublished)}</span>
                  </div>
                  <h3 className="mt-2 text-base leading-snug text-nexia-dark-teal-100 lg:text-lg transition-colors hover:text-nexia-light-teal-100">
                    {item?.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center text-nexia-dark-teal-100">
                    Read More
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Bounded>
    </div>
  );
};

export default InsightsSection;
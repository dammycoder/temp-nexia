"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bounded } from "@/_components/bouned";
import { getStrapiMedia } from "@/_lib/utils";
import { scrollAnimations } from "@/_lib/animations";

type Insight = {
  id: number;
  slug: string;
  title: string;
  description: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
};

const CaseStudySection = ({ data }: { data?: Insight }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const image = sectionRef.current.querySelector(".case-study-image");
    const content = sectionRef.current.querySelector(".case-study-content");

    scrollAnimations.onScroll(image, {
      from: { opacity: 0, x: -100 },
      to: { opacity: 1, x: 0, duration: 1 },
    });
    scrollAnimations.onScroll(content, {
      from: { opacity: 0, x: 100 },
      to: { opacity: 1, x: 0, duration: 1 },
    });
  }, [data]);

  if (!data) return null;

  const imageUrl = getStrapiMedia(data.image?.url ?? "");

  return (
    <Bounded ref={sectionRef} className="py-10">
      <div className="flex flex-col lg:flex-row justify-start gap-5">
        {/* Content */}
        <div className="flex w-full lg:w-1/2 flex-col gap-4">
          <h2 className="text-nexia-dark-teal-100 text-3xl font-bold md:text-4xl">
            {data.title}
          </h2>
          <p className="text-nexia-dark-teal-100">{data.description}</p>

          <Link
            href={`/insights/${data?.slug}`}
            type="button"
            className="bg-nexia-light-teal-100 font-effra text-nexia-dark-teal-100 mt-3 flex w-[180px] cursor-pointer items-center justify-center px-2 py-2 transition-all duration-300 hover:scale-105 hover:font-bold"
          >
            Read More
          </Link>
        </div>
        {/* Image */}
        <div className="case-study-image w-full lg:w-1/2">
          {imageUrl && (
            <div className="relative h-[400px]">
              <Image
                src={imageUrl}
                alt={data.image?.alternativeText || data.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Bounded>
  );
};

export default CaseStudySection;

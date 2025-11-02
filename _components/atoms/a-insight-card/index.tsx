'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getStrapiMedia } from "@/_lib/utils";

import { animations } from '@/_lib/animations';

type InsightCardProps = {
  id: number | string;
  slug: string;
  title: string;
  category: string;
  datePublished: string;
  image?: {
    formats?: {
      medium?: {
        url?: string;
      };
    };
  };
};

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

export const InsightCard = ({
  id,
  slug,
  title,
  category,
  datePublished,
  image,
}: InsightCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      animations.fadeInUp(cardRef.current, { delay: 0.1 });
    }
  }, []);

  const imageUrl =
    getStrapiMedia(image?.formats?.medium?.url ?? null) ??
    '/assets/jpg/profile-placeholder.svg';

  return (
    <Link key={id} href={`/insights/${slug}`} className="group">
      <div
        ref={cardRef}
        className="h-full overflow-hidden rounded-sm transition-shadow duration-200"
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-tr-4xl rounded-bl-4xl object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-sm text-nexia-dark-teal-100">
            <span className="tracking-wide uppercase font-bold">
              {category}
            </span>
            <span className="font-light">{formatDate(datePublished)}</span>
          </div>

          <h3 className="mt-2 text-base leading-snug text-nexia-dark-teal-100 lg:text-lg transition-colors hover:text-nexia-light-teal-100">
            {title}
          </h3>

          <span className="mt-4 inline-flex items-center text-nexia-dark-teal-100">
            Read More
          </span>
        </div>
      </div>
    </Link>
  );
};

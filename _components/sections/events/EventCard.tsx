/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { animations, scrollAnimations } from '@/_lib/animations';
import { getStrapiMedia } from '@/_lib/utils';

export type EventCardProps = {
  id: number;
  image?: string | null;
  tags?: Array<string | { label: string; href: string }>;
  title: string;
  author?: string;
  datePublished?: string;
  contents?: string;
  slug: string | number;
};

export default function EventCard({
  id,
  image,
  tags = [],
  title,
  datePublished,
  slug,
}: EventCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    scrollAnimations.onScroll(cardRef.current, {
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0 },
    });

    if (!imageRef.current) return;
    const cleanupHover = animations.hoverScale(imageRef.current);
    return () => cleanupHover?.();
  }, []);

  return (
    <Link href={`/events/${slug}`} className="block h-full">
      <div
        ref={cardRef}
        key={id}
        className="relative bg-white rounded-tr-4xl rounded-bl-4xl w-full max-w-[400px] shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 flex flex-col"
      >
        {/* Image section */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            ref={imageRef}
            src={getStrapiMedia(image ?? "") || '/assets/jpg/profile-placeholder.svg'}
            alt={title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />

          {datePublished && (
            <div className="absolute top-0 right-0 bg-nexia-dark-teal-100/95 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-tr-xl ">
              {new Date(datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </div>
          )}
        </div>

        {/* Card content */}
        <div className="p-6 flex flex-col flex-grow text-nexia-dark-teal-100">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 mt-1">
              {tags.map((tag, index) => {
                const isObject =
                  typeof tag === 'object' && tag !== null && 'label' in tag;

                if (isObject) {
                  const obj = tag as { label: string; href: string };
                  return (
                    <Link
                      key={`${id}-tag-${index}`}
                      href={obj.href}
                      className="px-2 py-1 bg-nexia-light-teal-100 text-nexia-dark-teal-100 text-xs rounded hover:bg-nexia-light-teal-200 transition-colors"
                    >
                      {obj.label}
                    </Link>
                  );
                }

                return (
                  <span
                    key={`${id}-tag-${index}`}
                    className="px-2 py-1 bg-nexia-light-teal-100 text-nexia-dark-teal-100 text-xs rounded"
                  >
                    {String(tag)}
                  </span>
                );
              })}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { animations, scrollAnimations } from '@/lib/animations';
import { getStrapiMedia } from '@/lib/utils';

export type EventCardProps = {
  id: number;
  image?: string | null;
  tags?: any[];
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
    return () => {
      cleanupHover?.();
    };
  }, []);

  return (
    <Link href={`/events/${slug}`} className="block h-full">
      <div
        ref={cardRef}
        key={id}
        className="relative bg-white rounded-tr-4xl rounded-bl-4xl max-w-[400px] h-full shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-200"
      >
        {image && (
          <div className="relative h-50 w-full overflow-hidden">
            <Image
              ref={imageRef}
              src={getStrapiMedia(image) || '/assets/jpg/events.jpg'}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-6">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={`${id}-tag-${index}`}
                  className="px-2 py-1 bg-nexia-light-teal-100 text-nexia-dark-teal-100 text-xs rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {datePublished && (
            <p className="absolute top-0 right-0 bg-nexia-dark-teal-100 text-sm text-white p-2 mb-2">
              {new Date(datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}

          <h3 className="text-xl font-bold text-nexia-dark-teal-100 mb-2 line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
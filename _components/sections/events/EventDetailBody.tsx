/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { getStrapiMedia, renderDescription } from "@/_lib/utils";
import {
  LinkedInIcon,
  TwitterIcon,
} from "@/_components/atoms/icons";
import { scrollAnimations } from "@/_lib/animations";
import Link from "next/link";
import Image from "next/image";

type EventDetailBodyProps = {
  contents?: any[] | null;
  relatedEvents?: any[] | null;
  tags: Array<{ id: number; name: string; slug?: string }>;
  relatedMedia?: any[] | null;
  eventTitle?: string;
};

export default function EventDetailBody({
  contents,
  relatedEvents,
  relatedMedia,
  tags,
  eventTitle = "",
}: EventDetailBodyProps) {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const shareRef = useRef<HTMLDivElement | null>(null);
  const relatedEventsRef = useRef<HTMLDivElement | null>(null);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `Check out this event: ${eventTitle}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };




  useEffect(() => {
    if (leftRef.current) {
      scrollAnimations.onScroll(leftRef.current, {
        from: { opacity: 0, y: 24 },
        to: { opacity: 1, y: 0 },
      });
    }
    if (shareRef.current) {
      scrollAnimations.onScroll(shareRef.current, {
        from: { opacity: 0, y: 24 },
        to: { opacity: 1, y: 0 },
      });
    }
    if (relatedEventsRef.current) {
      scrollAnimations.onScroll(relatedEventsRef.current, {
        from: { opacity: 0, y: 24 },
        to: { opacity: 1, y: 0 },
      });
    }
  }, []);

  return (
    <Bounded className="flex flex-col justify-between gap-10 py-8 lg:flex-row">
      <div ref={leftRef} className="w-full lg:w-7/10">
        {contents && (
          <div
            dangerouslySetInnerHTML={{ __html: renderDescription(contents) }}
          />
        )}

        {/* Fixed Related Media Section */}
        {Array.isArray(relatedMedia) && relatedMedia.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedMedia.map((media: any) => {
              const isImage = media?.mime?.startsWith("image/");
              const src = getStrapiMedia(media?.url);

              return (
                <div
                  key={media.id}
                  className="relative w-full aspect-video overflow-hidden rounded-lg shadow-md"
                >
                  {isImage && (
                    <Image
                      src={src ?? ""}
                      alt={media?.alternativeText || "Event media"}
                      fill
                      className="object-cover"
                    />
                  )}

                </div>
              );
            })}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          {tags?.map((tag: any) => (
            <Link
              key={tag?.id}
              href={`/tag/${tag.name}`}
              className="bg-nexia-light-teal-100 text-nexia-dark-teal-100 rounded px-2 py-1 text-xs hover:text-white transition-colors"
            >
              {tag?.name}
            </Link>
          ))}
        </div>
      </div>

      <div ref={shareRef} className="flex w-full flex-col gap-8 lg:w-3/10">
        {/* Fixed Share Section */}
        <div>
          <p className="text-nexia-dark-teal-100 text-xl">Share:</p>
          <div className="flex items-center gap-3">
            <button
              onClick={shareOnLinkedIn}
              aria-label="Share on LinkedIn"
            >
              <LinkedInIcon               className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors"
/>
            </button>

            <button
              onClick={shareOnTwitter}
              aria-label="Share on Twitter"
            >
              <TwitterIcon               className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors"
 />
            </button>
           
            
            
          </div>
        </div>

        {/* Fixed Related Events Section */}
        <div ref={relatedEventsRef}>
          <p className="text-nexia-light-teal-100 text-2xl">Related Events:</p>
          <div className="mt-4 flex flex-col gap-4">
            {relatedEvents?.map((event) => (
              <Link href={`/events/${event.slug}`} key={event.id}>
                <div className="flex gap-4 items-center rounded-xl border p-4 transition-colors hover:bg-gray-100">
                  <div className="w-1/3">
                    <Image 
                      src={getStrapiMedia(event?.image?.url) ?? "/assets/jpg/profile-placeholder.svg"} 
                      width={150} 
                      height={150} 
                      alt={event?.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="w-2/3">
                    <p className="text-nexia-dark-teal-100 font-bold text-lg">
                      {event?.title}
                    </p>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {(event.tags || tags)?.map((tag: any) => (
                        <span
                          key={tag.id}
                          className="bg-nexia-light-teal-100 text-nexia-dark-teal-100 rounded px-2 py-1 text-xs"
                        >
                          {tag?.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2 text-nexia-gray text-sm">
                      {event?.description}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Bounded>
  );
}
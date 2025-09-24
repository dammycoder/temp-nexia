/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import { renderDescription } from "@/lib/utils";
import {
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/atoms/icons";
import { scrollAnimations } from "@/lib/animations";
import Link from "next/link";

type EventDetailBodyProps = {
  contents?: any[] | null;
  relatedEvents?: any[] | null;
  tags: any[];
};

export default function EventDetailBody({
  contents,
  relatedEvents,
  tags,
}: EventDetailBodyProps) {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const shareRef = useRef<HTMLDivElement | null>(null);
  const relatedEventsRef = useRef<HTMLDivElement | null>(null);

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
      <div ref={leftRef} className=" w-full lg:w-3/5">
        {contents && (
          <div
            dangerouslySetInnerHTML={{ __html: renderDescription(contents) }}
          />
        )}
        <div className="mt-5 flex flex-wrap gap-2">
          {tags?.map((tag: any) => (
            <Link
              key={tag.id}
              href={`/tags/${tag.tag}`}
              className="bg-nexia-light-teal-100 text-nexia-dark-teal-100 rounded px-2 py-1 text-xs hover:text-white transition-colors"
            >
              {tag?.tag}
            </Link>
          ))}
        </div>
      </div>

      <div ref={shareRef} className="flex w-full flex-col gap-8 lg:w-2/5">
        <div>
          <p className="text-nexia-dark-teal-100 text-xl">Share:</p>
          <div className="flex items-center gap-3">
            <LinkedInIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
            <TwitterIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
            <InstagramIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
          </div>
        </div>
        <div ref={relatedEventsRef}>
          <p className="text-nexia-light-teal-100 text-2xl">Related Events:</p>
          <div className="mt-4 flex flex-col gap-4">
            {relatedEvents?.map((event) => (
              <Link href={`/events/${event.slug}`} key={event.id}>
                <div className="rounded-lg border p-4 transition-colors hover:bg-gray-100">
                  <p className="text-nexia-dark-teal-100 font-bold">
                    {event.title}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {tags?.map((tag: any) => (
                      <span
                        key={tag.id}
                        className="bg-nexia-light-teal-100 text-nexia-dark-teal-100 rounded px-2 py-1 text-xs"
                      >
                        {tag.tag}
                      </span>
                    ))}
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

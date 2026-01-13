/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef } from "react";
import { renderDescription } from "@/_lib/utils";
import { scrollAnimations } from "@/_lib/animations";
import EventCard, { EventCardProps } from "./EventCard";

type EventsCategorySectionProps = {
  id: number;
  title: string;
  description?: any;
  events: Array<{
    id: number;
      image?: {
                  url: string;
                  alternativeText?: string;
            };
        tags?: Array<{ id: number; name: string; slug?: string }>;
            title: string;
      author: string;
      datePublished: string;
      category: string;
      description: string;
      video?: { data: { attributes: { url: string } } | null };
      slug: string;
      contents?: string;
  }>;
};

export default function EventsCategorySection({ id, title, description, events }: EventsCategorySectionProps) {
  const headerRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    scrollAnimations.onScroll(headerRef.current, {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
    });
  }, []);

  return (
    <div key={id} className="flex flex-col gap-6 ">
      <h2 ref={headerRef} className="text-2xl text-nexia-dark-teal-100 font-bold">{title}</h2>

      {description && (
        <div className="text-lg text-nexia-gray max-w-4xl prose" dangerouslySetInnerHTML={{ __html: renderDescription(description) }} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {events?.map((event) => {
          const e = event;
          const card: EventCardProps = {
            id: event.id,
            image: e?.image?.url || undefined,
            tags: (e?.tags || []).map((t) => ({
              label: t.name,
              href: `/tag/${encodeURIComponent(t.slug || t.name)}`
            })),
            title: e?.title,
            author: e?.author,
            datePublished: e?.datePublished,
            contents: e?.description,
            slug: e?.slug,
            description: e?.description,
          };          
          return <EventCard key={event?.id} {...card} />;
        })}
      </div>
    </div>
  );
}



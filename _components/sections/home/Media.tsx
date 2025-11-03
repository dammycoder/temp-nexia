"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations } from "@/_lib/animations";

interface MediaItem {
  id:string
  YoutubeLink: string;
  title: string;
}

interface Props {
  data: MediaItem[] | undefined;
}

const MediaCard: React.FC<{ media: MediaItem; index: number }> = ({ media, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!cardRef.current || !titleRef.current) return;

    // Animate the card
    scrollAnimations.onScroll(
      cardRef.current,
      {
        from: { opacity: 0, y: 20 },
        to: { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          delay: index * 0.2
        }
      },
      {
        start: "top 85%",
        end: "bottom 15%"
      }
    );

    // Animate the title
    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 15 },
        to: { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          delay: index * 0.2 + 0.1
        }
      },
      {
        start: "top 85%",
        end: "bottom 15%"
      }
    );
  }, [media, index]);

  return (
    <div
      ref={cardRef}
      className="p-2 flex flex-col gap-2 w-full md:w-1/3 hover:scale-105 transition-transform duration-300"
    >
      <div className="relative w-full aspect-video">
        <iframe
          className="w-full h-full rounded-lg"
          src={media.YoutubeLink.replace("watch?v=", "embed/")}
          title={media.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p ref={titleRef} className="text-nexia-dark-teal-100 text-lg font-semibold mt-2">
        {media?.title}
      </p>
    </div>
  );
};

const MediaSection = ({ data }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      },
      {
        start: "top 80%",
        end: "bottom 20%"
      }
    );
  }, []);

  return (
    <Bounded ref={sectionRef} id="media-section" className="flex flex-col gap-6 py-8">
      <h2 ref={titleRef} className="text-3xl font-bold text-nexia-dark-teal-100">
        Trending Videos
      </h2>
      <div className="flex flex-col md:flex-row gap-6 flex-wrap">
        {data?.map((media, index) => (
          <MediaCard key={index} media={media} index={index} />
        ))}
      </div>
    </Bounded>
  );
};

export default MediaSection;

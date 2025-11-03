"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations } from "@/_lib/animations";

interface MediaItem {
  id: string;
  YoutubeLink: string;
  title: string;
}

interface Props {
  data: MediaItem[] | undefined;
}

// Helper function to extract YouTube video ID from various URL formats
const getYouTubeVideoId = (url: string): string => {
  if (!url) return '';
  
  try {
    // Ensure URL has protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(fullUrl);
    
    let videoId = '';
    
    // Handle youtu.be format
    if (urlObj.hostname === 'youtu.be') {
      videoId = urlObj.pathname.slice(1).split('?')[0];
    }
    // Handle youtube.com format
    else if (urlObj.hostname.includes('youtube.com')) {
      // Check query parameter (watch?v=...)
      videoId = urlObj.searchParams.get('v') || '';
      
      // Check pathname for embed/v URLs
      if (!videoId) {
        const pathMatch = urlObj.pathname.match(/\/(embed|v)\/([^/?]+)/);
        videoId = pathMatch?.[2] || '';
      }
    }
    
    return videoId;
  } catch (error) {
    console.error('Error parsing YouTube URL:', url, error);
    return '';
  }
};

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

  const videoId = getYouTubeVideoId(media.YoutubeLink);

  if (!videoId) {
    return (
      <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center p-4">
        <p className="text-gray-500 text-center">Invalid video URL</p>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-3 hover:scale-105 transition-transform duration-300"
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={media.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <p ref={titleRef} className="text-nexia-dark-teal-100 text-lg font-semibold line-clamp-2">
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

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <Bounded ref={sectionRef} id="media-section" className="flex flex-col gap-8 py-8">
      <h2 ref={titleRef} className="text-3xl font-bold text-nexia-dark-teal-100">
        Trending Videos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((media, index) => (
          <MediaCard key={media.id} media={media} index={index} />
        ))}
      </div>
    </Bounded>
  );
};

export default MediaSection;
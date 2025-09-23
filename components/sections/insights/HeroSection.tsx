'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bounded } from '@/components/bouned';
import { animations, scrollAnimations } from '@/lib/animations';

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
type HeroSectionProps = {
  insight?: Insight;
};

const HeroSection = ({ insight }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, y: 100 },
        to: { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      },
      {
        start: 'top 70%',
        end: 'bottom 30%',
      },
    );

    // Add parallax effect to background image
    const bgImage = heroRef.current.querySelector('img');
    if (bgImage) {
      animations.parallax(bgImage, -5);
    }
  }, []);

  const heroImage = '/assets/jpg/depositphotos_127543442-stock-photo-aerial-photography-on-top-of.jpg';

  return (
    <section id="insights-hero" ref={heroRef}>
      <div className="relative flex lg:h-[70vh] items-end">
        {/* Background Image */}
        <Image
          src={heroImage}
          alt="Insights Background"
          fill
          priority
          className="object-cover"
        />

        {/* Content */}
        <div
          ref={contentRef}
          className="relative z-10 container lg:px-12 flex h-3/5 w-full py-8 lg:w-1/2 items-center justify-center rounded-tr-4xl bg-white text-nexia-dark-teal-100"
        >
          <Bounded className="container mx-auto flex w-full flex-col gap-3 lg:px-12">
            <h1 className="text-2xl">Insights</h1>
            <p className="text-4xl font-bold">{insight?.title}</p>
          </Bounded>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

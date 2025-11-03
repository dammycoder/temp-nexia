'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bounded } from '@/_components/bouned';
import { animations, scrollAnimations } from '@/_lib/animations';

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
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ( !contentRef.current) return;
    if (panelRef.current) animations.fadeInRight(panelRef.current);

  scrollAnimations.onScroll(
  contentRef.current,
  {
    from: { opacity: 0, y: 100 },
    to: { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
  },
  {
    start: 'top bottom',  
    end: 'top center',    
  },
);

 
  }, []);

  const heroImage = '/assets/webp/hight-rise-condominium-office-buildings.webp';

  return (
    <div className="relative flex lg:h-[70vh] items-center lg:items-end">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Insights Background"
        fill
        quality={100}
        priority
        className="hidden lg:block object-cover"
      />

      <div ref={contentRef} className="z-100 w-full lg:bg-[linear-gradient(to_right,white_0_35%,transparent_35%)]">
        {/* Content */}
        <Bounded className="text-nexia-dark-teal-100 relative z-10 flex w-full items-end py-0">
          <div className="bg-white rounded-tr-4xl flex w-full lg:w-1/2 flex-col justify-center gap-3 px-0 py-8">
            <h1 className="text-2xl">Insights</h1>
            <p className="lg:w-9/10 text-2xl md:text-3xl lg:text-4xl font-bold">{insight?.title}</p>
           
          </div>
          <div className="hidden w-1/2 lg:block"></div>
        </Bounded>
      </div>
    </div>
  );
};

export default HeroSection;
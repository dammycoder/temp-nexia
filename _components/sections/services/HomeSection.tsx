'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bounded } from '@/_components/bouned';
import { animations, scrollAnimations } from '@/_lib/animations';

type Prop = {
  title: string;
  description: string;
  cta?: {
    text: string;
    href: string;
  };
};

type Props = {
  data: Prop;
};

const HeroSection = ({ data }: Props) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !contentRef.current) return;

    // Panel animation
    if (panelRef.current) animations.fadeInRight(panelRef.current);

    // Content scroll animation
    scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, y: 100 },
        to: { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      },
      {
        start: 'top 70%',
        end: 'bottom 30%',
      }
    );

    // Background parallax
    const bgImage = heroRef.current.querySelector('img');
    if (bgImage) {
      animations.parallax(bgImage, -5);
    }
  }, []);

  const heroImage = '/assets/jpg/bg-services.jpg';

  return (
    <div ref={heroRef} className="relative flex lg:h-[70vh] items-center lg:items-end">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Services Background"
        fill
        quality={85}
        priority
        className="hidden lg:block object-cover"
      />

      {/* Gradient overlay - same as about page */}
      <div ref={contentRef} className="z-100 w-full lg:bg-[linear-gradient(to_right,white_0_35%,transparent_35%)]">
        {/* Content */}
        <Bounded className="text-nexia-dark-teal-100 relative z-10 flex w-full items-end py-0">
          <div className="bg-white rounded-tr-4xl flex w-full lg:w-1/2 flex-col justify-center gap-3 px-0 py-8">
            <h1 className="text-2xl">Services</h1>
            <p className="lg:w-9/10 text-2xl md:text-3xl lg:text-4xl font-bold">{data?.description}</p>
            {data?.cta && (
              <Link
                href={data.cta.href}
                className="bg-nexia-light-teal-100 font-effra text-nexia-dark-teal-100 mt-3 flex w-[180px] cursor-pointer items-center justify-center px-2 py-2 transition-all duration-300 hover:scale-105 hover:font-bold"
              >
                {data.cta.text}
              </Link>
            )}
          </div>
          <div className="hidden w-1/2 lg:block"></div>
        </Bounded>
      </div>
    </div>
  );
};

export default HeroSection;
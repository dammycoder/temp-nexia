"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations} from "@/_lib/animations";

interface FactItem {
  figure: string;
  title: string;
}


interface Props {
  data: FactItem[] | undefined;
}

const FactCard: React.FC<{ fact: FactItem; index: number }> = ({ fact, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!cardRef.current || !numberRef.current || !labelRef.current) return;

    // Animate only the number text
    scrollAnimations.onScroll(
      numberRef.current,
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

    // Animate only the label text
    scrollAnimations.onScroll(
      labelRef.current,
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
  }, [fact, index]);

  return (
    <div 
      ref={cardRef}
      className="p-5 bg-[#2E53A1] h-30 w-full md:w-4/5 rounded-tr-4xl rounded-bl-4xl flex flex-col justify-end text-white hover:scale-105 transition-transform duration-300"
    >
      <p ref={numberRef} className="text-4xl font-bold">
        {fact.figure}
      </p>
      <p ref={labelRef} className="text-lg">
        {fact.title}
      </p>
    </div>
  );
};

const FactsAndFiguresSection = ({data}:Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Simple fade-in for title
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
    <Bounded 
      ref={sectionRef}
      id="facts-and-figures" 
      className="flex flex-col gap-3 py-8"
    >
      <h2 ref={titleRef} className="text-xl font-bold">
        Facts & Figures
      </h2>
      <div className="flex flex-col md:flex-row gap-3 items-start lg:items-center">
        {data?.map((fact:FactItem, index:number) => (
          <FactCard 
            key={index} 
            fact={fact} 
            index={index}
          />
        ))}
      </div>
    </Bounded>
  );
};

export default FactsAndFiguresSection;
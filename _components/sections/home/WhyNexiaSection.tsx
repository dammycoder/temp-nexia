"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations } from "@/_lib/animations";
import Link from "next/link";

type Data = {
  id?: number;
  title?: string;
  description?: string;
  cta?: {
    id?: number;
    href?: string;
    text?: string;
    external?: boolean;
  };
};


type Props ={
  data?: Data 
}



const WhyNexiaSection = ({data}:Props) => {
  const whyNexiaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (whyNexiaRef.current) {
      scrollAnimations.onScroll(
        whyNexiaRef.current,
        {
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        },
        {
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,

        },
      );
    }
  }, []);

  return (
    <Bounded
      ref={whyNexiaRef}
      id="why-nexia"
      className="flex flex-col justify-between gap-5 py-8 lg:flex-row"
    >
      <div className="flex w-full flex-col gap-5 lg:w-1/5">
        <h2 className="text-nexia-dark-teal-100 text-4xl font-bold">
          {data?.title}
        </h2>
      </div>
      <div className="flex w-full flex-col gap-5 lg:w-4/5">
        <p className="text-nexia-dark-teal-100 text-lg">{data?.description}</p>
        <Link href={data?.cta?.href ?? "#"}>
          <button
            type="button"
            className="border-nexia-dark-teal-100 text-nexia-dark-teal-100 hover:bg-nexia-dark-teal-100 w-fit cursor-pointer border px-6 py-2 font-medium transition-colors hover:text-white"
          >
            {data?.cta?.text}
          </button>
        </Link>
      </div>
    </Bounded>
  );
};

export default WhyNexiaSection;

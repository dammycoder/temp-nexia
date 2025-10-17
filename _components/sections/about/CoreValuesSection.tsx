'use client';
import React, { useEffect, useRef } from "react";
import { getStrapiMedia } from "@/_lib/utils";
import Image from "next/image";
import { scrollAnimations, animations } from "@/_lib/animations";
import { Bounded } from "@/_components/bouned";


interface Value {
  id: number;
  name: string;
  icon: {
    url: string;
    alternativeText?: string;
  };
}

interface CoreValuesProps {
  data?:Value[];
}

const CoreValuesSection: React.FC<CoreValuesProps> = ({ data }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !gridRef.current) return;

    // Animate title
    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      },
      { start: "top 85%", end: "bottom 15%" }
    );

    const gridItems = gridRef.current.children;
    if (gridItems.length) {
      animations.staggerIn(Array.from(gridItems), {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none",
          once: true,
        },
      });
    }
  }, [data]);

  // if (!data || !data.values || data.values.length === 0) {
  //   return null;
  // }

  return (
    <div ref={sectionRef} className="py-8 bg-gray-100 ">
      <Bounded className="flex flex-col gap-3">
      <h2 ref={titleRef} className="text-2xl text-nexia-light-teal-100 ">
            Our Core Values
          </h2>

          <p className="text-nexia-gray text-lg">Our character and behaviour are moulded and guided by our commitment to our core values of

</p>

        <div ref={gridRef} className="grid grid-cols-2 gap-8  md:grid-cols-3 lg:grid-cols-6">
          {data?.map((value) => {
            const imageUrl = getStrapiMedia(value.icon?.url) ?? "/assets/jpg/profile-placeholder.svg";
            return (
              <div
                key={value.id}
                className="flex flex-col bg-white shaow-lg rounded-lg opacity-0 p-4"
              >

                {imageUrl && (
                    <Image
                    src={imageUrl}
                    alt={value.icon?.alternativeText || value.name}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                )}
                  <h3 className="text-xl text-nexia-gray">{value.name}</h3>
              </div>
            );
          })}
        </div>
      </Bounded>
    </div>
  );
};

export default CoreValuesSection;

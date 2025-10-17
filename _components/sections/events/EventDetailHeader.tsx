"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animations } from "@/_lib/animations";
import { Bounded } from "@/_components/bouned";

type EventDetailHeaderProps = {
  category?: string;
  title: string;
  imageUrl?: string | null;
};

export default function EventDetailHeader({ category, title, imageUrl }: EventDetailHeaderProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) animations.fadeInLeft(textRef.current);
    if (imageRef.current) animations.fadeInRight(imageRef.current);
  }, []);

  return (
    <div className="bg-nexia-dark-teal-100 items-center py-5 ">
      <Bounded className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div ref={textRef} className="w-full lg:w-1/2">
          {category && <p className="text-nexia-light-teal-100 text-xl lg:text-2xl">{category}</p>}
          <p className="text-2xl font-light text-white md:text-3xl lg:text-5xl">{title}</p>
        </div>
        <div ref={imageRef} className="max-h-[400px] w-full overflow-clip  lg:w-1/2">
          <Image
            src={imageUrl || "/assets/jpg/events.jpg"}
            alt={title}
            width={200}
            height={200}
            className="rounded-tr-4xl rounded-bl-4xl max-h-[400px] w-full object-cover"
          />
        </div>
      </Bounded>
    </div>
  );
}



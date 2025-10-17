"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { animations } from "@/_lib/animations";
import { Bounded } from "@/_components/bouned";

type EventsHeroProps = {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
};

export default function EventsHero({
  title = "Events",
  subtitle = "Stay updated on the latest events and activities happening in our community.",
  backgroundImage = "/assets/jpg/events.jpg",
}: EventsHeroProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (panelRef.current) animations.fadeInRight(panelRef.current);
    if (textRef.current) animations.fadeInUp(textRef.current, { delay: 0.2 });
  }, []);

  return (
  

    <div className="relative flex items-end lg:h-[70vh]">
    <Image src={backgroundImage} alt="Events Background" fill className="object-cover -z-1 hidden lg:block" priority  />
        <div ref={panelRef} className="hidden lg:block absolute bottom-0  bg-white h-full lg:h-5/10 w-full lg:w-1/2 z-0 rounded-tr-4xl">

        </div>
       <Bounded   className="bg-white lg:bg-transparent py-8 flex items-end rounded-tr-4xl relative z-10 ">
       <div className="">
         <div ref={textRef} className=" flex w-full lg:w-1/2 flex-col gap-3 ">
          <h1 className="text-2xl ">{title}</h1>
         <p className="text-4xl font-bold  lg:w-9/10 ">{subtitle}</p>
         </div>
        </div>
       </Bounded>
    </div>
  );
}



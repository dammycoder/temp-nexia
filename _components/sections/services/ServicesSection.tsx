"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations } from "@/_lib/animations";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/_components/ui/tabs";
import { ArrowRight } from "lucide-react";

type Service = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  chair?: {
    id: number;
    name: string;
    position: string;
  };
  info?: Array<{
    id: number;
    title: string;
    content: string;
  }>;
};

type Props = {
  data: {
    title: string;
    description: string;
    services: Service[];
  };
};

const MainServicesSection = ({ data }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
      },
      { start: "top 80%", end: "bottom 20%" }
    );

    scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0, duration: 1.0, ease: "power3.out", delay: 0.3 },
      },
      { start: "top 80%", end: "bottom 20%" }
    );
  }, []);

  return (
    <div className="flex flex-col gap-3 py-8 bg-nexia-dark-teal-100">
      <Bounded
        ref={sectionRef}
        id="main-services"
        className="flex flex-col gap-6 py-8"
      >
        <h2
          ref={titleRef}
          className="text-lg md:text-xl font-bold text-nexia-light-teal-100"
        >
          {data?.title}
        </h2>
        <p
          ref={contentRef}
          className="text-2xl md:text-3xl lg:text-4xl text-white leading-snug"
        >
          {data?.description}
        </p>

        {data?.services?.length > 0 && (
          <Tabs defaultValue={data.services[0].slug} className="mt-8 w-full">
            {/* Service Tabs */}
            <TabsList className="flex flex-wrap gap-3 mb-[80px] md:mb-0 md:gap-0">
              {data.services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.slug}
                  className="text-white whitespace-nowrap"
                >
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Service Content */}
            {data.services.map((service) => (
              <TabsContent
                key={service.id}
                value={service.slug}
                className="w-full text-white"
              >
                {/* General description */}
                <p className="text-base md:text-lg mt-4 w-full lg:w-1/2">
                  {service.description}
                </p>

                {/* Info subsections */}
                <div className="mt-6 flex flex-wrap gap-6">
                  {service?.info?.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-white pb-4 w-full sm:w-1/2 lg:w-1/3"
                    >
                      <h4 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                        {item.title}
                                                <ArrowRight className="h-5 w-5 shrink-0" />

                      </h4>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </Bounded>
    </div>
  );
};

export default MainServicesSection;

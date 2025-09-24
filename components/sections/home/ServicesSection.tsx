/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import Image from "next/image";
import Link from "next/link";
import { MoveUpRightIcon } from "lucide-react";
import { animations } from "@/lib/animations";
import { getStrapiMedia } from "@/lib/utils";

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

type Service = {
  id: number;
  title: string;
  href: string;
  image: {
      id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  };
}

interface ServicesSectionProps {
    data?:{ 
      id?: string | number;
      services: Service[];
    } 
}

const ServicesSection = ({ data }: ServicesSectionProps) => {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (servicesRef.current) {
      const serviceCards = servicesRef.current.querySelectorAll('.service-card');
      if (serviceCards.length > 0) {
        animations.staggerIn(Array.from(serviceCards), {
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
      }
    }
  }, []);


  return (
    <Bounded ref={servicesRef} id="services" className="py-8">
      <div className="container grid w-fit auto-rows-auto grid-cols-1 gap-5 py-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.services?.map((service:Service) => (
          <Link href={service.href || "#"} key={service.id}>
            <div className="service-card relative h-60 w-90 cursor-pointer overflow-hidden rounded-tl-4xl rounded-br-4xl shadow-lg group">
              <Image
                src={getStrapiMedia(service?.image?.url) ?? "/assets/jpg/placeholder.jpg"} 
                alt={service?.image?.alternativeText || service.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={true}
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="absolute top-0 z-10 flex h-full w-full flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="mb-2 font-effra text-3xl font-bold">
                    {service?.title}
                  </h3>
                  <div className="bg-white/20 p-2 rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <MoveUpRightIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Bounded>
  );
};

export default ServicesSection;
"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import { scrollAnimations } from "@/_lib/animations";
import { MapPin, Phone } from "lucide-react";

interface Location {
  id: string;
  title: string;
  location: string;
  phone: string;
}

type Props ={
  data: Location[] | undefined
}



const LocationCard = ({ location, index }: { location: Location, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      scrollAnimations.onScroll(
        cardRef.current,
        {
          from: { opacity: 0, y: 30, scale: 0.95 },
          to: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6, 
            ease: "power3.out",
            delay: index * 0.1 // Stagger the animations
          }
        },
        {
          start: "top 85%",
          end: "bottom 20%"
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={`relative shadow-md border border-gray-100 p-6 rounded-lg transition-all duration-300 hover:shadow-lg`}
    >
  
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-8 h-8 bg-nexia-dark-teal-100 rounded-full flex items-center justify-center">
              <MapPin size={16} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-nexia-dark-teal-100 mb-2">
              {location?.title}
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {location?.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Phone size={12} className="text-nexia-dark-teal-100" />
            </div>
          </div>
          <p className="text-nexia-dark-teal-100 text-sm font-medium">
            {location?.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

const LocationsSection = ({data}: Props) => {
  const locationsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (locationsRef.current) {
      scrollAnimations.onScroll(
        locationsRef.current,
        {
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        },
        {
          start: "top 80%",
          end: "bottom 20%"
        }
      );
    }

    if (headerRef.current) {
      scrollAnimations.onScroll(
        headerRef.current,
        {
          from: { opacity: 0, x: -30 },
          to: { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: 0.2 }
        },
        {
          start: "top 85%",
          end: "bottom 20%"
        }
      );
    }

    // Animate the description section
    if (descriptionRef.current) {
      scrollAnimations.onScroll(
        descriptionRef.current,
        {
          from: { opacity: 0, y: 20 },
          to: { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", delay: 0.3 }
        },
        {
          start: "top 85%",
          end: "bottom 20%"
        }
      );
    }
  }, []);

  return (
    <Bounded ref={locationsRef} className="py-12" id="locations">
      {/* Header Section */}
      <div 
        ref={headerRef}
        className="flex items-center justify-between rounded-tr-4xl bg-nexia-dark-teal-100 px-4 lg:px-8 py-8 mb-0"
      >
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold">
          Find Local Contact
        </h2>
      </div>

      {/* Content Section */}
      <div className="rounded-bl-4xl bg-gray-50 px-4 lg:px-8 py-8 space-y-8">
        {/* Description */}
        <div ref={descriptionRef} className=" md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-nexia-dark-teal-100 mb-3">
            We are a leading global network of independent accounting and
            consulting firms
          </h3>
          <p className="text-lg text-nexia-gray">
            In Nigeria, we put ourselves in the heart of your business
          </p>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {data?.map((location, index) => (
            <LocationCard 
              key={location.id} 
              location={location} 
              index={index}
            />
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default LocationsSection;

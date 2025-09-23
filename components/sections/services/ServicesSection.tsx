"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import { scrollAnimations } from "@/lib/animations";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight } from "lucide-react";

const audit_list = [
    "Assurance",
    "FIRS",
    "Integrated Reporting"
]



const MainServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !contentRef.current) return;

    // Animate title first
    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, x: -50 },
        to: { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      },
      {
        start: "top 80%",
        end: "bottom 20%"
      }
    );

    scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, x: 50 },
        to: { opacity: 1, x: 0, duration: 1.0, ease: "power3.out", delay: 0.3 }
      },
      {
        start: "top 80%",
        end: "bottom 20%"
      }
    );
  }, []);

  return (
<div       className="flex flex-col gap-3 py-8 bg-nexia-dark-teal-100"
>
        <Bounded 
      ref={sectionRef}
      id="about-us-root" 
      className="flex flex-col gap-3 py-8"
    >
      <h2 ref={titleRef} className="text-xl font-bold text-nexia-light-teal-100">
        Our Services
      </h2>
      <p ref={contentRef} className="text-4xl text-white">
       We put ourselves in the heart of your business, to understand your needs and create tailored solutions
      </p>
      
     <Tabs defaultValue="account" className="mt-8">
          <TabsList>
            <TabsTrigger value="account" className="text-white">Audit</TabsTrigger>
            <TabsTrigger value="news" className="text-white">Tax</TabsTrigger>
            <TabsTrigger value="nexia-business-services" className="text-white">Advisory</TabsTrigger>

          </TabsList>
          <TabsContent value="account" className="w-full text-white ">
            <p className=" text-white text-lg mt-4 w-full lg:w-[33.33%]">         We provide audit and a range of other assurance services designed to identify, manage and adapt to all types of risks. Our audit and assurance services cover:
</p>
            <ul className="mt-4 text-white list-disc list-inside flex flex-col gap-3">
              {audit_list.map((item, index) => (
                <li key={index} className="text-lg flex items-center pb-3  border-b border-b-white w-full lg:w-[33.33%]">{item} <ArrowRight/></li>
                
              ))}
            </ul>
          </TabsContent>
          {/* <TabsContent value="password">Change your password here.</TabsContent> */}
        </Tabs>
    </Bounded>
</div>
  );
};

export default MainServicesSection;


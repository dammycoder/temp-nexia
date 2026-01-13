import React from "react";
import type { Metadata } from "next";
import {
  HeroSection,
  OurServicesSection,
  CaseStudySection,
  MainServicesSection,
  WhatTheySaySection,
  RelatedInsightsSection,
} from "@/_components/sections/services";
import {ContactSection} from "@/_components/sections/home";

import { strapiFetch } from "@/_lib/strapi";

export const metadata: Metadata = {
  title:
    "Services | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
    description:"Specialists work with you on a wide range of issues from audit, tax and advisory, including legal services, delivered through a proactive, partner-led approach."
};


const ServicesPage = async () => {
  const servicesPage = await strapiFetch<{
    data: {
      id: number;
      title: string;
      description: string;
      capabilities?: {
        id: number;
        title: string;
        content: string;
        featuredInsight?: {
          id: number;
          documentId: string;
          slug: string;
          contents: string;
          datePublished: string;
          description: string;
          category: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          title: string;
        };
        testimonials: Array<{
          id: number;
          name: string;
          description: string;
        }>;
        insights?: Array<{
          id: number;
          documentId: string;
          slug: string;
          contents: string;
          datePublished: string;
          description: string;
          category: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          title: string;
          image:{
            url:string;
            alternativeText:string;
          }
        }>;
      };
      ourServices:{
        title:string;
        description:string;
        services: Array<{
          id: number;
          documentId: string;
          title: string;
          description: string;
          slug: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        }>;
      },
      cta?: {
        id: number;
        text: string;
        href: string;
      };
    };
  }>("/api/services-page", {
    query: {
      populate: {
        capabilities: {
          populate: {
            featuredInsight: { populate: "image" },
            insights: { populate: "image" },
            testimonials:{populate: "*"}

          },
        },
        ourServices:{populate:{
          services:{populate:"*"}
        }},
        cta: { populate: "*" },
      },
    },
    next: { revalidate: 60 },
  });

  const page = servicesPage?.data;

  return (
    <section id="services-home">
      <HeroSection data={page} />
     {page?.capabilities && <OurServicesSection title={page?.capabilities?.title ?? ""} content={page?.capabilities?.content}/>}
      <MainServicesSection data = {page?.ourServices} />
      <CaseStudySection  data={page?.capabilities?.featuredInsight} />
      <WhatTheySaySection data={page?.capabilities?.testimonials} />
        {page?.capabilities?.insights && <RelatedInsightsSection insights={page?.capabilities?.insights}/>}
        <ContactSection />
    </section>
  );
};

export default ServicesPage;
export const dynamic = "force-dynamic";


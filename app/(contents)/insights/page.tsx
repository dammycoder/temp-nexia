import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/sections/insights/HeroSection";
import SearchSection from "@/components/sections/insights/SearchSection";
import InsightsSection from "@/components/sections/insights/InsightsSection";
import { SubscribeSection } from "@/components/sections/insights";
import UsefulLinksSection from "@/components/sections/insights/UsefulLinksSection";
import { strapiFetch } from "@/lib/strapi";

export const metadata: Metadata = {
  title:
    "Insights | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
};


type Insight = {
  id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    contents: string;
    datePublished: string;
      image: {
        url: string;
        formats?: {
          thumbnail?: { url: string | null};
          small?: { url: string | null };
          medium?: { url: string | null };
          large?: { url: string | null };
        };
  };
  };

const InsightsPage = async () => {
  const insights = await strapiFetch<{ data: Insight[] }>("/api/insights", {
    query: {
      populate: { image: true },
      sort: ["datePublished:desc"],
      pagination: { page: 1, pageSize: 10 },
    },
  });


const categorySchema = await strapiFetch<{
  data: {
    schema: {
      attributes: {
        category: {
          type: string;
          enum: string[];
          required: boolean;
          default: string;
        };
      };
    };
  };
}>("/api/content-type-builder/content-types/api::insight.insight");

const categories = categorySchema?.data?.schema?.attributes?.category?.enum;

const globalData = await strapiFetch<{
  data: {
    usefulLinks: Array<{
      id: string;
      href: string;
      text: string;
      external: boolean;
    }>;
  };
}>("/api/global", {
  query: {
    populate: ["usefulLinks"], 
  },
});

const usefulLinks = globalData.data.usefulLinks;

  const latestInsight = insights?.data?.length > 0 ? insights.data[0] : undefined;
  return (
    <section id="insights-home">
      <HeroSection insight={latestInsight} />
      <SearchSection categories={categories} />
      <SubscribeSection />
      <InsightsSection insights={insights?.data || []} />
      <UsefulLinksSection data={usefulLinks}/>
    </section>
  );
};

export default InsightsPage;

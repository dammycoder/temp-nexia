import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/_components/sections/insights/HeroSection";
import UsefulLinksSection from "@/_components/sections/insights/UsefulLinksSection";
import { strapiFetch } from "@/_lib/strapi";
import InsightsClient from "@/_components/organisms/o-insights"; 

export const metadata: Metadata = {
  title:
    "Insights | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
    description: "Insights include articles, news, Nexia Business Series, and topics like a windfall tax, withholding tax, and dark web cybercrimes."
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
      thumbnail?: { url: string | null };
      small?: { url: string | null };
      medium?: { url: string | null };
      large?: { url: string | null };
    };
  };
};

const InsightsPage = async () => {
  // Fetch categories (for the select filter)
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

  const categories =
    categorySchema?.data?.schema?.attributes?.category?.enum || [];

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

  const usefulLinks = globalData?.data?.usefulLinks || [];

  const insights = await strapiFetch<{ data: Insight[] }>("/api/insights", {
    query: {
      populate: { image: true },
      sort: ["datePublished:desc"],
      pagination: { page: 1, pageSize: 1 },
    },
  });

  const latestInsight = insights?.data?.[0];

  return (
    <section id="insights-home">
      {latestInsight && <HeroSection insight={latestInsight} />}

      {categories.length > 0 && <InsightsClient categories={categories} />}


      {usefulLinks.length > 0 && (
        <UsefulLinksSection data={usefulLinks} />
      )}
    </section>
  );
};

export default InsightsPage;


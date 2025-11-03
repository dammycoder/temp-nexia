/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import type { Metadata } from "next";
import { strapiFetch } from "@/_lib/strapi";
import { getStrapiMedia } from "@/_lib/utils";
import { notFound } from "next/navigation";
import InsightPage from "@/_components/sections/insights-slug";
async function fetchInsightBySlug(slug: string) {
  const insight = await strapiFetch<{
    data: Array<{
      id: number;
      title: string;
      slug: string;
      description: string;
      category: string;
      content: any[];
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
        image: {
          url: string;
          alternativeText: string;
        }
      }>;
      datePublished: string;
      image: {
        url: string;
        formats?: {
          thumbnail?: { url: string | null };
          small?: { url: string | null };
          medium?: { url: string | null };
          large?: { url: string | null };
        };
      };      resourceUrl?: string;
      tag: Array<{ id: number; name: string; slug?: string }>;
    }>;
  }>("/api/insights", {
    query: {
      filters: { slug: { $eq: slug } },
      populate: {
        image: true, tag: true, insights: { populate: "image" },
      },
    },
  });

  return insight.data[0] || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>; 
}): Promise<Metadata> {
  const { slug } = await params; 
  const insightData = await fetchInsightBySlug(slug); 
  if (!insightData) {
    return notFound()
  }

  const title = `${insightData.title} | Insights | Nexia Agbo Abel & Co`;
  const description = insightData.description || undefined;
  const url = `https://nexia.ng/insights/${insightData?.slug}`;
  const ogImage = getStrapiMedia(insightData.image?.url || "");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: insightData.title }]
        : undefined,
      siteName: "Nexia Agbo Abel & Co",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

// --- PAGE ---

export default async function Page({ params }: Readonly<{ params: Promise<{ slug: string }> }>) { 
   const { slug } = await params;
  const insightData = await fetchInsightBySlug(slug);

  if (!insightData) {
    return (
      notFound()
    );
  }

  const tags = insightData.tag || [];
  const imageUrl =
    getStrapiMedia(insightData.image?.url) ||
    "/assets/jpg/profile-placeholder.svg";

  return (
    <InsightPage
      insightData={insightData}
      imageUrl={imageUrl}
      tags={tags}
    />
  );
};

export const dynamic = "force-dynamic";

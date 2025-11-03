import TagPageClient from './index';
import type { Metadata } from "next";
import { getContentByTag } from "@/_lib/content";

type FlatEvent = {
  id: number;
  title: string;
  description?: string;
  slug?: string;
  datePublished?: string;
  image?: { url?: string; alternativeText?: string };
  tags?: Array<{ id: number; name: string; slug?: string }>;
};

type FlatInsight = {
  id: number;
  title: string;
  body?: string;
  slug?: string;
  datePublished?: string;
  category?: string;
  image?: { url?: string; alternativeText?: string };
  tag?: Array<{ id: number; name: string; slug?: string }>;
};

type ContentByTagResponse = {
  events: FlatEvent[];
  insights: FlatInsight[];
};

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = await params;

  const content = await getContentByTag(slug, 1, 10) as ContentByTagResponse;



  const events = (content.events || []).map((e) => ({ ...e, type: 'event' as const }));
  const insights = (content.insights || []).map((i) => ({ ...i, type: 'insight' as const }));
  
  const allContent = [...events, ...insights];
  
  const pageSize = 9;
  const totalItems = allContent.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = 1; 
  const start = (currentPage - 1) * pageSize;
  const paginatedContent = allContent.slice(start, start + pageSize);
  
  return (
    <TagPageClient
      params={{ slug }}
      initialContent={content}
      paginatedContent={paginatedContent}
      pagination={{ totalItems, totalPages, currentPage, pageSize }}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug: tag } = await params;
  const title = `"${tag}" | Nexia Agbo Abel & Co`;
  const description = `Explore all content tagged with "${tag}" including insights, events, and more from Nexia Agbo Abel & Co.`;
  const url = `https://nexia.ng/tag/${tag}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Nexia Agbo Abel & Co",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const dynamic = "force-dynamic";

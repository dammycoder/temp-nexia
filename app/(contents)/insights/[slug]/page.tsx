/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { strapiFetch } from "@/_lib/strapi";
import { getStrapiMedia, renderDescription } from "@/_lib/utils";
import { Bounded } from "@/_components/bouned";
import { DownloadIcon } from "lucide-react";
import {
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/_components/atoms/icons";

async function fetchInsightBySlug(slug: string) {
  const insight = await strapiFetch<{
    data: Array<{
      id: number;
      title: string;
      slug: string;
      description: string;
      category: string;
      content: any[];
      datePublished: string;
      image: { data: { attributes: { url: string } } };
      resourceUrl?: string;
      tag: Array<{ id: number; name: string; slug?: string }>;
    }>;
  }>("/api/insights", {
    query: {
      filters: { slug: { $eq: slug } },
      populate: { image: true, tag: true },
    },
  });

  return insight.data[0] || null;
}

// --- METADATA ---
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const insightData = await fetchInsightBySlug(params.slug);
  if (!insightData) {
    return {
      title: "Insight Not Found | Nexia",
      robots: { index: false, follow: false },
    };
  }

  const title = `${insightData.title} | Insights | Nexia Agbo Abel & Co`;
  const description = insightData.description || undefined;
  const url = `https://nexia.ng/insights/${insightData.slug}`;
  const ogImage = getStrapiMedia(insightData.image?.data?.attributes?.url || "");

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
const Page = async ({ params }: Readonly<{ params: { slug: string } }>) => {
  const { slug } = params;
  const insightData = await fetchInsightBySlug(slug);

  if (!insightData) {
    return (
      <div className="py-20 text-center text-gray-600">
        <p>Insight not found.</p>
      </div>
    );
  }

  const tags = insightData.tag || [];
  const imageUrl =
    getStrapiMedia(insightData.image?.data?.attributes?.url) ||
    "/assets/jpg/events.jpg";

  return (
    <div>
      {/* HERO SECTION */}
      <div className="bg-nexia-dark-teal-100 py-10">
        <Bounded className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2 space-y-4">
            <p className="text-nexia-light-teal-100 text-lg tracking-wide">
              {insightData.category}
            </p>
            <h1 className="text-3xl md:text-4xl  font-light text-white ">
              {insightData.title}
            </h1>
          </div>

          <div className="h-[300px] w-full lg:w-1/2 overflow-hidden rounded-tr-4xl rounded-bl-4xl">
            <Image
              src={imageUrl}
              alt={insightData.title}
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </Bounded>
      </div>

      {/* CONTENT SECTION */}
      <Bounded className="flex flex-col lg:flex-row gap-12 py-12">
        {/* LEFT: CONTENT */}
        <div className="w-full lg:w-3/5 space-y-6">
          <div
            className="prose max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: renderDescription(insightData.content),
            }}
          />

          {/* TAGS */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/tags/${tag.slug || tag.name}`}
                  className="bg-nexia-light-teal-100 text-nexia-dark-teal-100 rounded-sm px-3 py-1 text-xs font-semibold hover:text-white hover:bg-nexia-dark-teal-100 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* DOWNLOAD RESOURCE */}
          {insightData.resourceUrl && (
            <div className="mt-8">
              <a
                href={insightData.resourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-nexia-dark-teal-100 border border-nexia-dark-teal-100 px-4 py-2 rounded-full font-semibold hover:bg-nexia-dark-teal-100 hover:text-white transition-colors"
              >
                <DownloadIcon className="w-4 h-4" />
                Download Resource
              </a>
            </div>
          )}
        </div>

        {/* RIGHT: SIDEBAR */}
        <aside className="w-full lg:w-2/5 space-y-6">
          <div>
            <p className="text-xl text-nexia-dark-teal-100 mb-2">Share:</p>
            <div className="flex items-center gap-3">
              <LinkedInIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
              <TwitterIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
              <InstagramIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
            </div>
          </div>

          <div>
            <p className="text-xl text-nexia-light-teal-100 mb-2">
              Related Services:
            </p>
            <p className="text-nexia-dark-teal-100 text-base">Advisory</p>
          </div>

          <div>
            <p className="text-xl text-nexia-light-teal-100 mb-2">
              Related Insights:
            </p>
            <p className="text-gray-600 text-base italic">
              Coming soon...
            </p>
          </div>
        </aside>
      </Bounded>
    </div>
  );
};

export default Page;

/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { RelatedInsightsCarousel } from "@/_components/organisms/o-related-insights-carousel";
import { strapiFetch } from "@/_lib/strapi";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyNexiaSection,
  LocationsSection,
  ContactSection,
} from "@/_components/sections/home";

export const metadata: Metadata = {
  title:
    "Home | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
  description: "idk",
};

export default async function Home() {
  type Insight = {
    id?: number;
    title?: string;
    image?: string | { url?: string; alternativeText?: string };
    slug?: string;
    contents?: string;
    date?: string;
    description?: string;
    category?: string;
  };

  type InsightsSectionData = {
    id?: number;
    title?: string;
    subTitle?: string;
    cta?: { text: string; href: string; external?: boolean };
    insights?: Insight[];
  };

  type StrapiImageFormat = {
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
  };

  type StrapiImage = {
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

  // Service item type
  type ServiceItem = {
    id: number;
    title: string;
    href: string;
    image: StrapiImage;
  };

  type ServicesSectionData = {
    id?: number | string;
    services: ServiceItem[];
  };

  type WhyNexiaData = {
    id: number;
    title?: string;
    description?: string;
    cta?: { id?: number; href?: string; text?: string; external?: boolean };
  };

  type AboutData = {
    id?: number;
    title?: string;
    content?: string;
  };

  type HeroItem = {
    title?: string;
    description?: string;
    cta?: {
      href?: string;
      text?: string;
      external?: boolean;
    };
  };

  const landing = await strapiFetch<{ data: unknown | null }>(
    "/api/landing-page",
    {
      query: {
        populate: {
          heroCarousel: { populate: "*" },
          about: { populate: "*" },
          insights: {
            populate: {
              cta: { populate: "*" },
              insights: {
                populate: {
                  image: true,
                },
              },
            },
          },
          services: {
            populate: {
              services: {
                populate: { image: true },
              },
            },
          },
          whyNexia: { populate: "*" },
        },
      },
      next: { revalidate: 60 },
    },
  );

  const pageData = (landing.data ?? null) as {
    id?: number;
    heroCarousel?: HeroItem[];
    about: AboutData;
    insights?: InsightsSectionData;
    services?: ServicesSectionData;
    whyNexia?: WhyNexiaData;
  } | null;

  const globalData = await strapiFetch<{
    data: {
      location: Array<{
        id: string;
        title: string;
        location: string;
        phone: string;
      }>;
    };
  }>("/api/global", {
    query: {
      populate: ["location"],
    },
  });

  const Location = globalData?.data?.location;

  return (
<div className="font-effra">
  {pageData?.heroCarousel && <HeroSection data={pageData.heroCarousel} />}
  {pageData?.about && <AboutSection about={pageData.about} />}
  {pageData?.services && <ServicesSection data={pageData.services} />}
  {pageData?.insights && <RelatedInsightsCarousel data={pageData.insights} />}
  {pageData?.whyNexia && <WhyNexiaSection data={pageData.whyNexia} />}
  {Location && <LocationsSection data={Location} />}
  <ContactSection />
</div>

  );
}
export const dynamic = "force-dynamic";

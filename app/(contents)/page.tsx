import type { Metadata } from "next";
import { RelatedInsightsCarousel } from "@/components/organisms/o-related-insights-carousel";
import { strapiFetch } from "@/lib/strapi";
import {
  HeroSection,
  AboutSection,
  ServicesSection,
  WhyNexiaSection,
  LocationsSection,
  ContactSection,
} from "@/components/sections/home";

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

  type ServicesSectionData = {
    id?: number | string;
    services?: Array<{
      id: number;
      title: string;
      href: string;
      image: { url: string; alternativeText: string };
    }>;
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


  type HeroItem= {
  title?:string;
  description?:string;
  cta?: {
    href?: string;
    text?:string;
    external?: boolean;
  }
}

  const landing = await strapiFetch<{ data: unknown | null }>("/api/landing-page", {
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
  });

  const pageData = (landing.data ?? null) as
    | {
        id?: number;
        heroCarousel?: HeroItem[];
        about?: AboutData;
        insights?: InsightsSectionData;
        services?: ServicesSectionData;
        whyNexia?: WhyNexiaData;
      }
    | null;



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
    
    const Location = globalData.data.location;
    console.log("related Inisghts TYPED",  pageData?.insights)
    
  return (
    <div className="font-effra">
      <HeroSection data={pageData?.heroCarousel ?? []} />
      <AboutSection about={pageData?.about} />
      <ServicesSection data={pageData?.services} />
      <RelatedInsightsCarousel data={pageData?.insights} />
      <WhyNexiaSection data={pageData?.whyNexia} />
      <LocationsSection data={Location} />
      <ContactSection />
    </div>
  );
}


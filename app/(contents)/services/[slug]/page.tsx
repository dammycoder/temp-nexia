import React from "react";
import type { Metadata } from "next";
import { HeroSection, ServiceContent, HowWeCanHelpSection } from "@/_components/sections/service-slug";
import { strapiFetch } from "@/_lib/strapi";
import { notFound } from "next/navigation";
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const serviceData = await fetchServiceBySlug(params.slug);

  if (!serviceData) {
    return {
      title: "Service Not Found | Nexia Agbo Abel & Co",
      robots: { index: false, follow: false },
    };
  }

  const title = `${serviceData.title} | Services | Nexia Agbo Abel & Co`;
  const description = serviceData.description || undefined;
  const url = `https://nexia.ng/services/${serviceData.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "Nexia Agbo Abel & Co",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}


const fetchServiceBySlug = async (slug: string) => {
  const response = await strapiFetch<{
    data: Array<{
      id: number;
        title: string;
        description: string;
        slug: string;
        chair: {
          id: number;
          image: { data: { attributes: { url: string } } };
          name: string;
          position: string;
          slug:string;
        };
        info: Array<{
          id: number;
          title: string;
          content: string;
          subItems: Array<{
            id: number;
            title: string;
            content: string;
          }>;
        }>;

    }>;
  }>("/api/services", {
    query: {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        chair: {
          populate: ["image"]
        },
        info: {
          populate: ["subItems"]
        }
      },
    },
  });


  return response.data[0] || null;
};


export default async function ServicePage({ params }: { params: { slug: string } }) {
    const serviceData = await fetchServiceBySlug(params.slug);
  
  if (!serviceData) {
    notFound();
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const service: any = {
    id: serviceData.id,
    title: serviceData.title,
    description: serviceData.description,
    slug: serviceData.slug,
    chair: serviceData.chair,
    info: serviceData.info,
  };

  return (
    <section className="">
        <HeroSection data={service}/>
<ServiceContent service={service} />
      <HowWeCanHelpSection />
    </section>
  );
};


import React from "react";
import type { Metadata } from "next";
import { HeroSection, ServiceContent } from "@/_components/sections/service-slug";
import { strapiFetch } from "@/_lib/strapi";
import { notFound } from "next/navigation";
import { ContactSection } from "@/_components/sections/home";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const serviceData = await fetchServiceBySlug(slug);

  if (!serviceData) {
    notFound()
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
        slug: string;
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


export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const serviceData = await fetchServiceBySlug(slug);
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
      <HeroSection data={service} />
      <ServiceContent service={service} />
      <ContactSection />

    </section>
  );
};
export const dynamic = "force-dynamic";



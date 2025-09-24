import React from "react";
import type { Metadata } from "next";
import { HeroSection, ServiceContent, HowWeCanHelpSection } from "@/components/sections/service-slug";
import { strapiFetch } from "@/lib/strapi";
export const metadata: Metadata = {
  title: "Service | Nexia Agbo Abel & Co",
};


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
    return <div>Service not found</div>;
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


/* eslint-disable @typescript-eslint/no-explicit-any */
import { strapiFetch } from "@/_lib/strapi";
import { notFound } from "next/navigation";
import EventDetailHeader from "@/_components/sections/events/EventDetailHeader";
import EventDetailBody from "@/_components/sections/events/EventDetailBody";
import { getStrapiMedia } from "@/_lib/utils";
import type { Metadata } from "next";

type EventData = {
  id: number;
  title: string;
  slug: string;
  description: unknown[];
  category: string;
  contents: any[];
  datePublished: string;
  image: { url: string };
  tags: Array<{
    id: number;
    name: string;
    slug?: string;
  }>;
  relatedEvents: {
    events: Array<{
      id: number;
      title: string;
      slug: string;
      image: {
        url: string;
      };
      tags: Array<{
        id: number;
        name: string;
        slug?: string;
      }>;
    }>;
  };
  relatedMedia?: Array<{
    id: number;
    url: string;
    mime: string;
    alternativeText?: string;
  }>;
};

async function fetchEventBySlug(slug: string) {
  const event = await strapiFetch<{ data: EventData[] | null }>("/api/events", {
    query: {
      filters: { slug: { $eq: slug } },
      populate: { 
        image: true, 
        relatedEvents: { 
          populate: { 
            events: { populate: { image: true } },
          } 
        }, 
        tags: true,
        relatedMedia: true, // This populates root level relatedMedia
      },
    },
  });

  return event.data && event.data.length > 0 ? event.data[0] : null;
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const {slug} = await params;
  const eventData = await fetchEventBySlug(slug);

  if (!eventData) {
    return { title: "Event Not Found | Nexia", robots: { index: false, follow: false } };
  }

  const title = `${eventData.title} | Events | Nexia Agbo Abel & Co`;
  const description = typeof eventData.description === "string" ? eventData.description : undefined;
  const url = `https://nexia.ng/events/${eventData.slug}`;
  const ogImage = getStrapiMedia(eventData.image?.url || "");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: eventData.title }] : undefined,
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

const Page = async({params}:Readonly<{ params: {slug:string}}>) =>{
  const {slug} = await params;
  const eventData = await fetchEventBySlug(slug);

  if (!eventData) {
    notFound();
  }


  const relatedMedia = eventData.relatedMedia || []

  return (
      <div className="animate-fade-in">
        <EventDetailHeader 
          category={eventData?.category}
          title={eventData?.title}
          imageUrl={getStrapiMedia(eventData?.image?.url)}
        />
        <EventDetailBody 
          relatedEvents={eventData?.relatedEvents?.events}
          contents={eventData?.contents}
          relatedMedia={relatedMedia} // Pass the correct relatedMedia
          tags={eventData?.tags}
          eventTitle={eventData?.title} // Add eventTitle for sharing
        />
      </div>
  );
}

export default Page;
export const dynamic = "force-dynamic";

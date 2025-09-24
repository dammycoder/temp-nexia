/* eslint-disable @typescript-eslint/no-explicit-any */
import { strapiFetch } from "@/lib/strapi";
import { notFound } from "next/navigation";
import EventDetailHeader from "@/components/sections/events/EventDetailHeader";
import EventDetailBody from "@/components/sections/events/EventDetailBody";
import { getStrapiMedia } from "@/lib/utils";

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
    tag: string;
  }>
  relatedEvents: Array<{
    id: number;
    title: string;
    slug: string;
    image: {
      url: string;
    };
    tags: Array<{
      id: number;
      tag: string;
    }>;
  }>;
};

const Page = async({params}:Readonly<{ params: {slug:string}}>) =>{
  const {slug} = params;

  const event = await strapiFetch<{ data: EventData[] | null; }>("/api/events", {
    query: {
      filters: {
        slug: {
          $eq: slug 
        },
      },
      populate: { image: true, relatedEvents: { populate: "*" }, tags: true },
    },
  });


  if (!event.data || event.data.length === 0) {
    notFound();
  }

  const eventData = event.data[0];

  return (
      <div className="animate-fade-in">
        <EventDetailHeader 
          category={eventData?.category}
          title={eventData?.title}
          imageUrl={getStrapiMedia(eventData?.image?.url)}
        />
        <EventDetailBody 
          relatedEvents={eventData?.relatedEvents}
          contents={eventData?.contents}
          tags={eventData?.tags}
        />
      </div>
  );
}

export default Page;
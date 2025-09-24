/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { Metadata } from "next";
import { Bounded } from "@/components/bouned";
import { strapiFetch } from "@/lib/strapi";
import EventsHero from "@/components/sections/events/EventsHero";
import EventsCategorySection from "@/components/sections/events/EventsCategorySection";

export const metadata: Metadata = {
  title: "Events | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
};


export default async function EventsPage() {
const eventPage = await strapiFetch<{
    data: {
      id: number;
      title: string;
      description: string;
      events: Array<{
        id: number;
        title: string;
        description?: any;
        events: Array<{
          id: number;
            image?: {
                  url: string;
                  alternativeText?: string;
            };
            tags: Array<{
              id: number;
              tag: string;
            }>;
            title: string;
            author: string;
            datePublished: string;
            category: string;
            description: string;
            video?: {
              data: {
                attributes: {
                  url: string;
                  alternativeText?: string;
                };
              } | null;
            };
            slug: string;

        }>;
      }>;
    } | null;
  }>("/api/events-page", {
    query: {
      populate: {
        events: {
          populate: {
            events: {
              populate: {
                image: {
                  fields: ['url', 'alternativeText']
                },
                video: {
                  fields: ['url', 'alternativeText']
                },
                tags: {
                  populate: "*"
                },
              }
            }
          }
        },
      },
    },
    next: { revalidate: 60 },
  });

  const eventsData = eventPage?.data;


  
  return (
    <section id="events-home" className="">
      <EventsHero />

      <Bounded id="events-categories" className="mt-8 py-8 flex flex-col gap-12">
        {eventsData?.events?.map((category) => (
          <EventsCategorySection key={category.id} {...category} />
        ))}
        
        {(!eventsData?.events || eventsData.events.length === 0) && (
          <div className="text-center py-12">
            <p className="text-nexia-gray text-lg">
              No event categories available at the moment.
            </p>
          </div>
        )}
      </Bounded>
    </section>
  );
};
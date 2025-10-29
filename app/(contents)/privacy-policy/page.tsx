import React from 'react'
import type { Metadata } from 'next';
import Image from 'next/image';
import { Bounded } from '@/_components/bouned';
import { strapiFetch } from '@/_lib/strapi';
import { renderDescription } from '@/_lib/utils';

export const metadata: Metadata = {
    title:
      "Privacy Policy | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
  };


const globalData = await strapiFetch<{
  data: {
      privacy_policy: {
        sections: Array<{
          title: string;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          content: any[];
        }>;
      };
    };
}>("/api/global", {
  query: {
    populate: {
      privacy_policy: {
        populate: ["sections"],
      },
    },
  },
});

const policies = globalData?.data?.privacy_policy.sections;


const page = () => {
  return (
    <section id="privacy-policy-page">
          <div className="relative flex h-[20vh] ">
        <Image
            src="/assets/jpg/hero-image.jpg"
          alt="Hero"
          className="object-cover"
          priority
        />

        <Bounded className="relative z-10 container flex items-center  text-white">
        <h1 className="text-4xl ">Privacy Policy</h1>
           
        </Bounded>
      </div>

       <Bounded className="py-8 flex flex-col gap-8">
        {policies?.map((section, index) => (
          <div key={index}>
            <h2 className="font-medium text-nexia-dark-teal-100 text-xl md:text-2xl lg:text-3xl mb-2">
              {index + 1}. {section?.title}
            </h2>

            <div
              className="px-4 lg:px-6 text-nexia-gray text-lg space-y-4"
              dangerouslySetInnerHTML={{ __html:renderDescription( section?.content) }}
            />
          </div>
        ))}
      </Bounded>

    </section>
  )
}

export default page

export const dynamic = "force-dynamic";

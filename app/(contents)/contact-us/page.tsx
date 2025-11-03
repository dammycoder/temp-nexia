import React from "react";
import type { Metadata } from "next";
import { Bounded } from "@/_components/bouned";
import { strapiFetch } from "@/_lib/strapi";
import ContactForm from "@/_components/organisms/o-contact-us";

export const metadata: Metadata = {
  title:
    "Contact Us | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
};

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
  query: { populate: ["location"] },
});

const locations = globalData?.data?.location;



const ContactPage = () => {
  return (
    <Bounded
      id="contact-us"
      className="flex flex-col gap-12 py-12 lg:flex-row lg:gap-20"
    >
      <div className="flex w-full flex-col gap-8 lg:w-1/2">
        <h1 className="text-5xl font-light text-nexia-dark-teal-100">
          Get in touch
        </h1>

        <div className="space-y-8">
          {locations?.map((loc) => (
            <div
              key={loc?.id}
              className="flex flex-col text-lg text-nexia-gray space-y-1"
            >
              <p className="font-bold text-nexia-dark-teal-100">
                {loc?.title}
              </p>
              <p>{loc?.location}</p>
              <p>
                <span className="font-bold">Tel:</span> {loc?.phone}
              </p>
            </div>
          ))}
        </div>
      </div>

  <ContactForm/>
    </Bounded>
  );
};

export default ContactPage;
export const dynamic = "force-dynamic";

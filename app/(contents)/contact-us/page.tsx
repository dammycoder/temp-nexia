import React from "react";
import type { Metadata } from "next";
import { Bounded } from "@/_components/bouned";
import { Input } from "@/_components/a-input";
import { Textarea } from "@/_components/atoms/a-textarea";
import { strapiFetch } from "@/_lib/strapi";

export const metadata: Metadata = {
  title:
    "Contact Us | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
};

// Fetch global locations
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

      <form className="flex w-full flex-col gap-6 lg:w-1/2">
        <Input type="text" placeholder="How can we help?" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Input type="text" placeholder="Company" />
          <Input type="text" placeholder="Phone" />
        </div>

        <div className="flex flex-col">
          <Textarea
            placeholder="Message"
            className="min-h-[200px] rounded-xl bg-gray-100 text-base placeholder:font-effra placeholder:text-lg placeholder:font-medium focus:border-nexia-light-teal-100"
            rows={8}
          />
          <p className="mt-2 text-sm font-bold text-nexia-gray">
            600 max characters
          </p>
        </div>

        <Input type="text" placeholder="Where did you hear about us?" />

        <div className="space-y-3">
          <p className="text-sm font-bold text-nexia-gray">
            By submitting this form, you consent to how Nexia will process your
            personal data.
          </p>

          <div className="flex flex-col space-y-2">
            <p className="text-sm font-bold text-nexia-gray">
              Do you agree to Nexia Agbo & Co processing your personal data?
            </p>
            <label className="flex items-center text-sm text-nexia-gray">
              <input
                type="radio"
                className="accent-nexia-light-teal-100 mr-2"
              />
              I agree to the{" "}
              <span className="mx-1 underline font-bold text-nexia-dark-teal-100">
                privacy policy
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-full border border-nexia-dark-teal-100 bg-gray-100 px-8 py-2 font-bold text-nexia-dark-teal-100 hover:bg-nexia-light-teal-50 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </Bounded>
  );
};

export default ContactPage;
export const dynamic = "force-dynamic";

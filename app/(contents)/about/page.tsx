import React from "react";
import type { Metadata } from "next";
import {
  HeroSection,
  AboutContentSection,
  OurRootSection,
  InternationalAffiliationSection,
  MeetTheTeamSection,
  FactsAndFiguresSection,
  OurServicesSection,
} from "@/components/sections/about";
import { strapiFetch } from "@/lib/strapi";

export const metadata: Metadata = {
  title:
    "About Us | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
};

interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  slug: string;
  image: {
    id: number;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };
}

interface Stat {
  name:string;
  figure:string;
}

export default async function About () {
const aboutPage = await strapiFetch<{
  data: {
    id: number;
      title: string;
      descrtiption: string;
      about: unknown;
      cta: unknown;
      internationalAffiliation: unknown;
      OurRoot: unknown[];
      teamMembers:unknown;
  } | null;
}>("/api/about-page", {
  query: {
    populate: {
      about: { populate: "*" },
      cta: { populate: "*" },
      internationalAffiliation: { populate: "*" },
      OurRoot: { populate: "*" },
    },
  },
  next: { revalidate: 60 },
});

const teamMembers = await strapiFetch<{data: TeamMember[]}>("/api/team-members", {
  query: {
    populate: { image: true },
  },
});

const stats = await strapiFetch<{data: Stat[]}>("/api/stats", {
  query: {
    populate: "*"
  },
});
const pageData = aboutPage?.data;
const TeamData = teamMembers?.data;
const statsData =  stats?.data;



  return (
    <section id="about-us-home">
      <HeroSection title={pageData?.title ?? "About Us"} description={pageData?.descrtiption?? "Your trusted local advisory firm, supported by a global Nexia  network"}/>
      <AboutContentSection data={pageData?.about}/>
      <OurRootSection data={pageData?.OurRoot} />
      <InternationalAffiliationSection data={pageData?.internationalAffiliation}/>
      <OurServicesSection/>
      <MeetTheTeamSection data={TeamData}/>
      <FactsAndFiguresSection data={statsData} />
    </section>
  );
};

// export default About;

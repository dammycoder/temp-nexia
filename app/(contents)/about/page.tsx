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
  CoreValuesSection,
} from "@/_components/sections/about";
import { strapiFetch } from "@/_lib/strapi";

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
  title: string;
  figure: string;
}

type Value = {
  id: number;
  name: string;
  icon: {
    url: string;
    alternativeText?: string;
  };
}



export default async function About() {
  const aboutPage = await strapiFetch<{
    data: {
      id: number;
      title: string;
      descrtiption: string;
      about: {
        title: string;
        content: string;
      };
      cta: unknown;
      internationalAffiliation: {
        title: string;
        content: string;
      };
      OurRoot: {
        title: string;
        content: string;
      };
      teamMembers: unknown;
      values: Value[];
    }
  }>("/api/about-page", {
    query: {
      populate: {
        about: { populate: "*" },
        cta: { populate: "*" },
        internationalAffiliation: { populate: "*" },
        OurRoot: { populate: "*" },
        values: { populate: "icon" },
      },
    },
    next: { revalidate: 60 },
  });

  const teamMembers = await strapiFetch<{ data: TeamMember[] }>("/api/team-members", {
    query: {
      populate: { image: true },
    },
  });

  const stats = await strapiFetch<{ data: Stat[] }>("/api/stats", {
    query: {
      populate: "*"
    },
  });
  const pageData = aboutPage?.data;
  const TeamData = teamMembers?.data;
  const statsData = stats?.data;

  return (
    <section id="about-us-home">
      <HeroSection title={pageData?.title ?? "About Us"} description={pageData?.descrtiption ?? "Your trusted local advisory firm, supported by a global Nexia  network"} />
      {pageData?.about && <AboutContentSection data={pageData.about} />}
      {pageData?.OurRoot && <OurRootSection data={pageData.OurRoot} />}
      {pageData?.internationalAffiliation && (
        <InternationalAffiliationSection data={pageData.internationalAffiliation} />
      )}
      {pageData?.values && <CoreValuesSection data={pageData.values} />}
      <OurServicesSection /> 
      {TeamData && <MeetTheTeamSection data={TeamData} />}
      {statsData && <FactsAndFiguresSection data={statsData} />}

    </section>
  );
};

export const dynamic = "force-dynamic";

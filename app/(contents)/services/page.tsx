import React from "react";
import type { Metadata } from "next";
import {
  HeroSection,
  OurServicesSection,
  CaseStudySection,
  MainServicesSection,
  WhatTheySaySection,
  RelatedInsightsSection,
  HowWeCanHelpSection,
} from "@/components/sections/services";
export const metadata: Metadata = {
  title:
    "Services | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
};

const About = () => {
  return (
    <section id="about-us-home">
      <HeroSection />
      <OurServicesSection/>
       <MainServicesSection/>
      <CaseStudySection/>
      <WhatTheySaySection/>
      <RelatedInsightsSection/>
      <HowWeCanHelpSection/>
    </section>
  );
};

export default About;

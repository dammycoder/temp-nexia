import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Bounded } from "@/components/bouned";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title:
    "Events | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
};

const page = () => {
  return <section id="events-home">
      <div className="relative flex h-[70vh] items-end">
        {/* Background Image */}
        <Image
          src="/assets/jpg/events.jpg"
          alt="Insights Background"
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(0,50,60,0)_0%,rgba(0,50,60,0.6)_71.85%,rgba(0,50,60,0.7)_100%)]"></div> */}

        {/* Example content */}
        <div className="relative z-10 container flex h-3/5 w-1/2 items-center rounded-tr-4xl bg-white px-12 text-nexia-dark-teal-100">
          <div className="mx-auto flex w-full flex-col gap-3 px-6">
            <h1 className="text-2xl ">Events</h1>
            <p className="text-4xl font-bold">
            Stay updated on the latest events and activities happening in our community.
            </p>
          </div>
        </div>
      </div>

      <Bounded id="insights-categories" className="py-8 mt-8">
        <Tabs defaultValue="account" className="">
          <TabsList>
            <TabsTrigger value="account">Nexia Day</TabsTrigger>
            <TabsTrigger value="news">Book Club </TabsTrigger>
            <TabsTrigger value="nexia-business-services">Others</TabsTrigger>



          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </Bounded>
  </section>;
};

export default page;

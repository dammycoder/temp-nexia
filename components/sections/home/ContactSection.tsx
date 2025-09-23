"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/components/bouned";
import Image from "next/image";
import { scrollAnimations } from "@/lib/animations";
import Link from "next/link";

const ContactSection = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contactRef.current) {
      scrollAnimations.onScroll(
        contactRef.current,
        {
          from: { opacity: 0, y: 50 },
          to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        },
        {
          start: "top 80%",
          end: "bottom 20%"
        }
      );
    }
  }, []);

  return (
    <Bounded ref={contactRef} className="flex flex-col-reverse py-8 lg:flex-row">
      <div className="w-full overflow-clip lg:w-1/2">
        <Image
          src="/assets/jpg/contact-us-section.jpg"
          alt=""
          width={100}
          height={100}
          priority
          className="w-full object-cover max-h-[600px]"
        />
      </div>
      <div className="flex w-full flex-col justify-center gap-5 bg-nexia-light-teal-80 p-12 lg:w-1/2">
        <p className="text-dark-teal-100 text-lg font-bold">
          How can we help You
        </p>
        <p className="text-dark-teal-100 w-full lg:w-8/10 text-2xl">
          if you need product or project advice, technical support, or have
          any other questions, we&apos;re here to help
        </p>
<Link href="/contact-us">
        <button
          type="button"
          className="w-fit cursor-pointer bg-nexia-dark-teal-100 px-6 py-2 font-medium text-white hover:bg-white hover:text-nexia-dark-teal-100 transition-colors"
        >
          Contact Us
        </button>
</Link>
      </div>
    </Bounded>
  );
};

export default ContactSection;

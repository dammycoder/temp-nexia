import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bounded } from "@/components/bouned";
import {
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/atoms/icons";
import { strapiFetch } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/utils";

type SocialLink = {
image: {
        url: string;
        formats?: {
          thumbnail?: { url: string | null};
          small?: { url: string | null };
          medium?: { url: string | null };
          large?: { url: string | null };
        };
      };
  href: string;
};

type FooterLogo = {
  id: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any;
  href: string;
};

type SubLink = {
  title: string;
  href: string;
  external?: boolean;
};

type FooterLink = {
  id: number;
  href: string;
  text: string;
  external?: boolean;
  subLink?: SubLink[];
};

type FooterData = {
  id: number;
  socialLinks: SocialLink[];
  footerLogo: FooterLogo;
  copyright: string;
  links: FooterLink[];
  partnerPolicy: string;
};

async function loadFooterData(): Promise<FooterData> {
  const globalData = await strapiFetch<{
    data: {
      footer: FooterData;
    };
  }>("/api/global", {
    query: {
      populate: {
        footer: {
          populate: {
            socialLinks: {
              populate: ["image"],
            },
            footerLogo: {
              populate: ["image"],
            },
            links: {
              populate: ["subLink"],
            },
            // copyright: true,
            // partnerPolicy: true
          },
        },
      },
    },
  });

  return globalData.data.footer;
}

export default async function Footer() {
  const footerData = await loadFooterData();

  return (
    <>
      <footer className="bg-nexia-light-teal-80 font-effra py-8">
        <Bounded className="flex flex-col justify-between gap-4 lg:flex-row">
          <div className="flex w-full flex-col gap-3 lg:w-1/2">
            {/* <Logo/> */}
            <div className="flex w-full items-center gap-2 text-white">
              <p className="text-lg lg:text-2xl">Member of</p>{" "}
              <Image
              src={getStrapiMedia(footerData?.footerLogo?.image.url) ?? "/assets/png/abel.png"}
                alt="nexia-global-logo"
                width={100}
                height={100}
                className="w-[200px] object-contain"
              />
            </div>
            <p className="text-base text-white">{footerData?.copyright}</p>
          </div>
          <div className="w-1/2">
            <ul className="text-left text-lg text-white lg:text-right xl:text-lg">
  
              {footerData?.links?.map((link, index: number) => (
                <li key={index}>
                  <Link
                    href={link.href || "#"}
                    className="block"
                    target={link.external ? "_blank" : "_self"}
                    rel={link.external ? "noopener noreferrer" : ""}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Bounded>
        <Bounded className="mt-3 flex items-center gap-3 lg:justify-end">
          <LinkedInIcon />
          <InstagramIcon />
          <TwitterIcon />
        </Bounded>
      </footer>
      <div className="bg-nexia-dark-teal-100 font-effra py-8">
        <Bounded className="flex text-white">
          <p>{footerData?.partnerPolicy}</p>
        </Bounded>
      </div>
    </>
  );
}

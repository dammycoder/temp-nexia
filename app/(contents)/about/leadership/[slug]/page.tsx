/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Bounded } from "@/components/bouned";
import Image from "next/image";
import Link from "next/link";
import { strapiFetch } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}



const fetchLeadershipBySlug = async (slug: string) => {
  const response = await strapiFetch<{
    data: Array<{
      id: number;
        name: string;
  email: string;
  bio: string;
  position: string;
  phone: string;
  expertise: Array<{ id: number; title: string }>;
  qualifications: Array<{ id: number; title: string }>;
  image: {
      id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  };
    }>;
  }>("/api/team-members/", {
    query: {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
    },
  });

  return response.data[0] || null;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const leadershipData = await fetchLeadershipBySlug(params.slug);
  const leadership = leadershipData;

  if (!leadership) {
    return {
      title: "Leadership Not Found",
    };
  }

  return {
    title: `${leadership.name} | Leadership Profile`,
    description: leadership.bio || undefined,
    openGraph: {
      title: `${leadership.name} | Leadership Profile`,
      description: leadership.bio || undefined,
    },
  };
}

export default async function LeadershipProfile({ params }: Props) {
  const leadershipData = await fetchLeadershipBySlug(params.slug);

  if (!leadershipData) {
    return <div>Leadership not found</div>;
  }

  const leadership = leadershipData;

  return (
    <div>
      <div
        className="h-fit bg-nexia-dark-teal-100 py-8"
        id="about-leadership-section"
      >
        <Bounded className="flex items-center gap-5">
          {leadership.image?.url && (
            <Image
              src={getStrapiMedia(leadership?.image?.url) || "/assets/png/profile-placeholder.svg"}
              alt={leadership.name}
              width={180}
              height={180}
              sizes="(max-width: 768px) 100vw, 180px"
              className="h-auto w-[120px] max-w-[180px] cursor-pointer rounded-lg object-cover transition-all duration-500 hover:rounded-none lg:w-[180px]"
            />
          )}

          <div className="flex flex-col gap-2 lg:ml-5">
            <p className="text-3xl text-nexia-light-teal-100 md:text-2xl lg:text-5xl">
              {leadership.name}
            </p>
            <Link
              href={`mailto:${leadership.email}`}
              className="block text-lg font-light break-all text-white transition-all hover:underline md:text-xl lg:text-3xl"
            >
              {leadership.email}
            </Link>
          </div>
        </Bounded>
      </div>

      <div>
        <Bounded className="bg py-8 flex flex-col gap-5 mb-3 text-nexia-dark-teal-100 border-b-gray-200 lg:flex-row">
          <div className="flex flex-col gap-4 bg-gray-100 p-5 rounded-xl w-full lg:w-fit ">
            <p className="flex flex-col gap-2">
              <span className="text-nexia-dark-teal-100 text-2xl">
                Job Title
              </span>
              <span className="text-lg text-nexia-gray">{leadership?.position}</span>
            </p>
            <p className="flex flex-col gap-2">
              <span className="text-nexia-dark-teal-100 text-2xl">Email</span>
              <Link
                href={`mailto:${leadership?.email}`}
                className="text-lg text-nexia-light-teal-100"
              >
                {leadership?.email}
              </Link>
            </p>
            <p className="flex flex-col gap-2">
              <span className="text-nexia-dark-teal-100 text-2xl">Mobile</span>
              <span className="text-lg text-nexia-gray">{leadership?.phone}</span>
            </p>
          </div>

          <div>
            <p className="text-lg text-nexia-gray">
             {leadership?.expertise?.length > 0 &&(
              <>
               <span className="text-xl text-nexia-dark-teal-100">
                Expertise <br />
              </span>

              <div className="mt-2 flex flex-wrap gap-2 lg:gap-5 text-nexia-light-teal-100 lg:flex-row">
                {leadership.expertise?.map((exp, index) => (
                  <span key={index}>{exp.title}</span>
                ))}
              </div>

                            <br />

              </>
             )}
              <div>
                <span className="text-xl text-nexia-dark-teal-100">
                  Qualifications <br />
                </span>

                <div className="mt-2 flex flex-col gap-1">
                  {leadership.qualifications?.map((qual, index) => (
                    <span key={index}>{qual?.title}</span>
                  ))}
                </div>
              </div>
            </p>
          </div>
        </Bounded>
      </div>
    </div>
  );
}
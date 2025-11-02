/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { Bounded } from "@/_components/bouned";
import Image from "next/image";
import Link from "next/link";
import { strapiFetch } from "@/_lib/strapi";
import { getStrapiMedia } from "@/_lib/utils";

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

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
    const {slug} = await params;
  const leadershipData = await fetchLeadershipBySlug(slug);
  const leadership = leadershipData;

  if (!leadership) {
    return {
      title: "Leadership Not Found",
    };
  }

  return {
    title: `${leadership.name} | Leadership Profile | Nexia Agbo Abel & Co`,
    description: leadership.bio || undefined,
    alternates: { canonical: `https://nexia.ng/about/leadership/${params.slug}` },
    openGraph: {
      title: `${leadership.name} | Leadership Profile | Nexia Agbo Abel & Co`,
      description: leadership.bio || undefined,
      url: `https://nexia.ng/about/leadership/${params.slug}`,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title: `${leadership.name} | Leadership Profile | Nexia Agbo Abel & Co`,
      description: leadership.bio || undefined,
    },
  };
}

export default async function LeadershipProfile({params}:Readonly<{ params: {slug:string}}>) {
  const {slug} = await params;

  const leadershipData = await fetchLeadershipBySlug(slug);

  if (!leadershipData) {
    return <div>Leadership not found</div>;
  }

  const leadership = leadershipData;

  return (
    <div>
      <div
        className="bg-nexia-dark-teal-100 h-fit py-8"
        id="about-leadership-section"
      >
        <Bounded className="flex items-center gap-5">
          {leadership.image?.url && (
            <Image
              src={
                getStrapiMedia(leadership?.image?.url) ??
                "/assets/jpg/profile-placeholder.svg"
              }
              alt={leadership.name}
              width={180}
              height={180}
              sizes="(max-width: 768px) 100vw, 180px"
              className="h-auto w-[120px] max-w-[180px] cursor-pointer rounded-lg object-cover transition-all duration-500 hover:rounded-none lg:w-[180px]"
            />
          )}

          <div className="flex flex-col gap-2 lg:ml-5">
            <p className="text-nexia-light-teal-100 text-3xl md:text-2xl lg:text-5xl">
              {leadership.name}
            </p>
            <Link
              href={`mailto:${leadership?.email}`}
              className="block break-all text-lg font-light text-white transition-all hover:underline md:text-xl lg:text-3xl"
            >
              {leadership?.email}
            </Link>
          </div>
        </Bounded>
      </div>

      <div>
        <Bounded className=" text-nexia-dark-teal-100 mb-3 flex flex-col gap-5 border-b-gray-200 py-8 lg:flex-row">
          <div className="flex h-fit flex-col gap-4 rounded-xl bg-gray-100 p-5 lg:w-fit">
            <p className="flex flex-col gap-2">
              <span className="text-nexia-dark-teal-100 text-2xl">
                Job Title
              </span>
              <span className="text-nexia-gray text-lg">
                {leadership?.position}
              </span>
            </p>
            <p className="flex flex-col gap-2">
              <span className="text-nexia-dark-teal-100 text-2xl">Email</span>
              <Link
                href={`mailto:${leadership?.email}`}
                className="text-nexia-light-teal-100 text-lg"
              >
                {leadership?.email}
              </Link>
            </p>
            <p className="flex flex-col gap-2">
              <span className="text-nexia-dark-teal-100 text-2xl">Mobile</span>
              <span className="text-nexia-gray whitespace-nowrap text-lg">
                {leadership?.phone}
              </span>
            </p>
          </div>

          <div>
            {leadership?.bio && (
              <div>
                <div className="text-nexia-gray text-lg">
                  {leadership?.bio && (
                    <>
                      <span className="text-nexia-dark-teal-100 text-xl">
                        Bio <br />
                      </span>

                      <div className="text-nexia-gray mb-4 w-full gap-2 lg:gap-5">
                        {leadership?.bio}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="text-nexia-gray text-lg">
              {leadership?.expertise?.length > 0 && (
                <>
                  <span className="text-nexia-dark-teal-100 text-xl">
                    Expertise <br />
                  </span>

                  <div className="text-nexia-light-teal-100 mt-2 flex flex-wrap gap-2 lg:flex-row lg:gap-5">
                    {leadership?.expertise?.map((exp, index) => (
                      <span key={index}>{exp.title}</span>
                    ))}
                  </div>

                  <br />
                </>
              )}
{leadership?.qualifications?.length > 0 && <div>
                <span className="text-nexia-dark-teal-100 text-xl">
                  Qualifications <br />
                </span>

                <div className="mt-2 flex flex-col gap-1">
                  {leadership?.qualifications?.map((qual, index) => (
                    <span key={index}>{qual?.title}</span>
                  ))}
                </div>
              </div>}
            </div>
          </div>
        </Bounded>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

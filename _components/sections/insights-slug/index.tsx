'use client'
import React, { useRef, useEffect } from 'react'
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { renderDescription } from "@/_lib/utils";
import { Bounded } from "@/_components/bouned";
import {
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/_components/atoms/icons";
import {InsightCard} from "@/_components/atoms/a-insight-card"
import { scrollAnimations } from "@/_lib/animations";


const FlipbookViewer = dynamic(() => import("@/_components/flipbook-viewer"), {
  ssr: false,
});

type InsightPageProps = {
  insightData: {
    id: number;
    title: string;
    slug: string;
    description: string;
    category: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: any[];
    insights?: Array<{
      id: number;
      documentId: string;
      slug: string;
      contents: string;
      datePublished: string;
      description: string;
      category: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      title: string;
      image: {
        url: string;
        alternativeText: string;
      }
    }>;
    datePublished: string;
    image: {
      url: string;
      formats?: {
        thumbnail?: { url: string | null };
        small?: { url: string | null };
        medium?: { url: string | null };
        large?: { url: string | null };
      };
    };
    resourceUrl?: string;
    tag: Array<{ id: number; name: string; slug?: string }>;
  };
  imageUrl: string;
  tags: Array<{ id: number; name: string; slug?: string }>;
};

const InsightPage: React.FC<InsightPageProps> = ({ insightData, imageUrl, tags }) => {
  const shareRef = useRef<HTMLDivElement | null>(null);
  const relatedInsightsRef = useRef<HTMLDivElement | null>(null);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const text = `Check out this insight: ${insightData.title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };



  useEffect(() => {
    if (shareRef.current) {
      scrollAnimations.onScroll(shareRef.current, {
        from: { opacity: 0, y: 24 },
        to: { opacity: 1, y: 0 },
      });
    }
    if (relatedInsightsRef.current) {
      scrollAnimations.onScroll(relatedInsightsRef.current, {
        from: { opacity: 0, y: 24 },
        to: { opacity: 1, y: 0 },
      });
    }
  }, []);
  return (
    <div>
      <div className="bg-nexia-dark-teal-100 py-10">
        <Bounded className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="w-full lg:w-1/2 space-y-4">
            <p className="text-nexia-light-teal-100 text-lg tracking-wide">
              {insightData?.category}
            </p>
            <h1 className="text-3xl md:text-4xl  font-light text-white ">
              {insightData?.title}
            </h1>
          </div>

          <div className="h-[300px] w-full lg:w-1/2 overflow-hidden rounded-tr-4xl rounded-bl-4xl">
            <Image
              src={imageUrl}
              alt={insightData?.title}
              width={800}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        </Bounded>
      </div>

      {/* CONTENT SECTION */}
      <Bounded className="flex flex-col lg:flex-row gap-12 py-12">
        {/* LEFT: CONTENT */}
        <div className="w-full lg:w-3/5 space-y-6">
          <div
            className="prose max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: renderDescription(insightData.content),
            }}
          />

          {/* TAGS */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {tags.map((tag) => (
                <Link
                  key={tag?.id}
                  href={`/tags/${tag?.slug || tag?.name}`}
                  className="bg-nexia-light-teal-100 text-nexia-dark-teal-100 rounded-sm px-3 py-1 text-xs font-semibold hover:text-white hover:bg-nexia-dark-teal-100 transition-colors"
                >
                  {tag?.name}
                </Link>
              ))}
            </div>
          )}

          {insightData.resourceUrl && (
            <FlipbookViewer resourceUrl="https://nexia.ng/wp-content/uploads/2024/09/Federal-Governments-One-time-Windfall-Tax-on-Realized-Foreign-Exchange-Profits-by-Nigerian-Banks.pdf" />
          )}
        </div>

        <aside className="w-full lg:w-2/5 space-y-6">
          <div ref={shareRef}>
            <p className="text-xl text-nexia-dark-teal-100 mb-2">Share:</p>
            <div className="flex items-center gap-3">
              <button
                onClick={shareOnLinkedIn}
                aria-label="Share on LinkedIn"
                className="cursor-pointer"
              >
                <LinkedInIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
              </button>
              <button
                onClick={shareOnTwitter}
                aria-label="Share on Twitter"
                className="cursor-pointer"
              >
                <TwitterIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
              </button>
              <button
                aria-label="Share on Instagram"
                className="cursor-pointer"
              >
                <InstagramIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors" />
              </button>
            </div>
          </div>

          {insightData.insights && insightData.insights.length > 0 && (
            <div ref={relatedInsightsRef} className="mt-4">
              <p className="text-xl text-nexia-dark-teal-100 mb-4">Related Insights:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {insightData.insights.map((related) => (
                  <InsightCard
                    key={related?.id}
                    id={related?.id}
                    slug={related?.slug}
                    title={related?.title}
                    category={related?.category}
                    datePublished={related?.datePublished}
                    image={{
                      formats: {
                        medium: {
                          url: related.image?.url,
                        },
                      },
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </aside>
      </Bounded>
    </div>
  )
}

export default InsightPage
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bounded } from "@/_components/bouned";
import Link from "next/link";
import Image from "next/image";
import { getStrapiMedia } from "@/_lib/utils";
import { searchContent } from "@/_lib/content";

type Media = {
  url?: string;
  alternativeText?: string;
};

type Tag = {
  name?: string;
  slug?: string;
};

type Event = {
  id: number;
  title?: string;
  description?: string;
  slug?: string;
  datePublished?: string;
  author?: string;
  category?: string;
  image?: Media;
  tags?: Tag[];
};

type Insight = {
  id: number;
  title?: string;
  contents?: string;
  slug?: string;
  datePublished?: string;
  category?: string;
  image?: Media;
  tags?: Tag[];
};

type SearchResult = {
  events: Event[];
  insights: Insight[];
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams?.get("s");

  const [results, setResults] = useState<SearchResult>({ events: [], insights: [] });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async (reset = false) => {
    if (!search) return;
    setLoading(true);
    setError(null);

    try {
      const data: any = await searchContent(search, reset ? 1 : page, pageSize);

      const events: Event[] = (data?.events || []).map((item: any) => ({
        id: item?.id,
        title: item?.title,
        description: item?.description,
        slug: item?.slug,
        datePublished: item?.datePublished,
        author: item?.author,
        category: item?.category,
        image: item?.image || undefined,
        tags: item?.tags || [],
      }));

      const insights: Insight[] = (data?.insights || []).map((item: any) => ({
        id: item?.id,
        title: item?.title,
        contents: item?.contents,
        slug: item?.slug,
        datePublished: item?.datePublished,
        category: item?.category,
        image: item?.image || undefined,
        tags: item?.tags || [],
      }));

      if (reset) {
        setResults({ events, insights });
        setPage(2);
      } else {
        setResults((prev) => ({
          events: [...prev.events, ...events],
          insights: [...prev.insights, ...insights],
        }));
        setPage((prev) => prev + 1);
      }

      // If returned items < pageSize, no more results
      if ((events.length + insights.length) < pageSize) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch  {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!search) {
      router.replace("/");
      return;
    }

    fetchResults(true);
  }, [search,  router]);

  if (!search) return null;

  const totalResults = results.events.length + results.insights.length;

  return (
    <div className="">
      {/* Hero Section */}
      <div className="bg-nexia-dark-teal-100">
        <Bounded>
          <div className="py-12 h-40 ">
            <h1 className="text-white text-4xl md:text-5xl font-light font-effra-light">
              Results for: &quot;{search}&quot;
            </h1>
          </div>
        </Bounded>
      </div>

      {/* Results Section */}
      <Bounded>
        <div className="py-12">
          {loading && (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-nexia-dark-teal-100"></div>
                <p className="mt-4 text-gray-600">Searching...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {!loading && !error && totalResults === 0 && (
            <div className="text-center">
              <h2 className="text-2xl text-nexia-dark-teal-100 mb-4">
                No results found
              </h2>
              <p className="text-gray-600 mb-6">
                Try searching with different keywords
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-nexia-dark-teal-100 text-white rounded hover:bg-nexia-light-teal-100 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}

          {!loading && !error && totalResults > 0 && (
            <div className="space-y-12">
              {/* Events + Insights */}
              <section>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {results.events.map((event) => (
                    <Link
                      key={event?.id}
                      href={`/events/${event?.slug ?? ''}`}
                      className="block h-full group"
                    >
                      <div className="relative h-fit bg-white rounded-tr-4xl rounded-bl-4xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                        {event?.image?.url && (
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={getStrapiMedia(event?.image?.url) || "/assets/jpg/events.jpg"}
                              alt={event?.image?.alternativeText ?? event?.title ?? ''}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          {event?.category && (
                            <span className="inline-block px-3 py-1 bg-nexia-light-teal-100 text-nexia-dark-teal-100 text-xs font-medium rounded-lg mb-3">
                              {event?.category}
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-nexia-dark-teal-100 mb-2 line-clamp-2 group-hover:text-nexia-light-teal-100 transition-colors">
                            {event?.title}
                          </h3>
                          {event?.description && (
                            <p className="text-gray-600 text-sm line-clamp-3">
                              {event?.description?.replace(/<[^>]*>/g, '')}
                            </p>
                          )}
                          {event?.datePublished && (
                            <p className="text-sm text-gray-500 mt-3">
                              {new Date(event?.datePublished).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}

                  {results.insights.map((insight) => (
                    <Link
                      key={insight?.id}
                      href={`/insights/${insight?.slug ?? ''}`}
                      className="block h-full group"
                    >
                      <div className="relative h-fit bg-white rounded-tr-4xl rounded-bl-4xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                        {insight?.image?.url && (
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={getStrapiMedia(insight?.image?.url) || "/assets/jpg/insights.jpg"}
                              alt={insight?.image?.alternativeText ?? insight?.title ?? ''}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          {insight?.category && (
                            <span className="inline-block px-3 py-1 bg-nexia-light-teal-100 text-nexia-dark-teal-100 text-xs font-medium rounded-full mb-3">
                              {insight?.category}
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-nexia-dark-teal-100 mb-2 line-clamp-2 group-hover:text-nexia-light-teal-100 transition-colors">
                            {insight?.title}
                          </h3>
                          {insight?.contents && (
                            <p className="text-gray-600 text-sm line-clamp-3">
                              {insight?.contents?.replace(/<[^>]*>/g, '')}
                            </p>
                          )}
                          {insight?.datePublished && (
                            <p className="text-sm text-gray-500 mt-3">
                              {new Date(insight?.datePublished).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load More */}
                {hasMore && !loading && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => fetchResults(false)}
                      className="px-6 py-2 bg-nexia-dark-teal-100 text-white rounded hover:bg-nexia-light-teal-100 transition-colors"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </Bounded>
    </div>
  );
}

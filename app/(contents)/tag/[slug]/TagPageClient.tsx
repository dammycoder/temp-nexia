'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { animations, scrollAnimations } from '@/_lib/animations';
import { Bounded } from "@/_components/bouned";
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/_lib/utils';

type EventData = {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug?: string;
    image?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    datePublished?: string;
    tags?: {
      data: Array<{
        id: number;
        attributes: {
          tag: string;
        };
      }>;
    };
  };
};

type InsightData = {
  id: number;
  attributes: {
    title: string;
    contents: string;
    slug?: string;
    image?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
        };
      };
    };
    datePublished?: string;
    category?: string;
    tags?: {
      data: Array<{
        id: number;
        attributes: {
          tag: string;
        };
      }>;
    };
  };
};

// Supports both nested (REST-like) and flat (GraphQL) shapes
type FlatEvent = {
  id: number;
  title: string;
  description?: string;
  slug?: string;
  datePublished?: string;
  image?: { url?: string; alternativeText?: string };
  tags?: Array<{ id: number; name: string; slug?: string }>;
};

type FlatInsight = {
  id: number;
  title: string;
  contents?: string;
  slug?: string;
  datePublished?: string;
  category?: string;
  image?: { url?: string; alternativeText?: string };
  tag?: Array<{ id: number; name: string; slug?: string }>;
};

type ContentByTagResponse = {
  events?: { data?: EventData[] } | FlatEvent[];
  insights?: { data?: InsightData[] } | FlatInsight[];
};

function ContentCard({ 
  item, 
  type
}: { 
  item: EventData | InsightData | FlatEvent | FlatInsight; 
  type: 'event' | 'insight';
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cardRef.current);

    if (imageRef.current) {
      const cleanupHover = animations.hoverScale(imageRef.current, 1.05);
      return () => {
        cleanupHover?.();
        observer.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  // field accessors to support both shapes
  const nested = (item as EventData | InsightData).attributes as EventData['attributes'] | InsightData['attributes'] | undefined;
  const nestedEvent = nested as EventData['attributes'] | undefined;
  const nestedInsight = nested as InsightData['attributes'] | undefined;
  const flatEvent = item as FlatEvent;
  const flatInsight = item as FlatInsight;

  const title = type === 'event'
    ? (nestedEvent?.title ?? flatEvent.title)
    : (nestedInsight?.title ?? flatInsight.title);

  const description = type === 'event'
    ? (nestedEvent?.description ?? flatEvent.description)
    : (nestedInsight?.contents ?? flatInsight.contents);

  const slug = (type === 'event'
    ? (nestedEvent?.slug ?? flatEvent.slug)
    : (nestedInsight?.slug ?? flatInsight.slug)) ?? item.id.toString();

  const image = (type === 'event'
    ? (nestedEvent?.image?.data?.attributes?.url ?? flatEvent.image?.url)
    : (nestedInsight?.image?.data?.attributes?.url ?? flatInsight.image?.url));

  const datePublished = (type === 'event'
    ? (nestedEvent?.datePublished ?? flatEvent.datePublished)
    : (nestedInsight?.datePublished ?? flatInsight.datePublished));

  const category = type === 'insight'
    ? (nestedInsight?.category ?? flatInsight.category)
    : undefined;

  // Normalize tags from both nested and flat shapes, with de-duplication
  const tagItems: Array<{ label: string; href: string }> = (() => {
    const items: Array<{ label: string; href: string }> = [];

    if (type === 'event') {
      // Nested: attributes.tags.data[].attributes.tag
      (nestedEvent?.tags?.data || []).forEach((t) => {
        const label = t?.attributes?.tag;
        if (label) items.push({ label, href: `/tag/${encodeURIComponent(label)}` });
      });
      // Flat: tags: Array<{ name, slug }>
      (flatEvent.tags || []).forEach((t) => {
        const label = t?.name;
        if (label) items.push({ label, href: `/tag/${encodeURIComponent(t.slug || label)}` });
      });
    } else {
      // Nested: attributes.tags.data[].attributes.tag
      (nestedInsight?.tags?.data || []).forEach((t) => {
        const label = t?.attributes?.tag;
        if (label) items.push({ label, href: `/tag/${encodeURIComponent(label)}` });
      });
      // Flat: tag: Array<{ name, slug }>
      (flatInsight.tag || []).forEach((t) => {
        const label = t?.name;
        if (label) items.push({ label, href: `/tag/${encodeURIComponent(t.slug || label)}` });
      });
    }

    // De-duplicate by label while preserving order
    const seen = new Set<string>();
    return items.filter(({ label }) => {
      if (seen.has(label)) return false;
      seen.add(label);
      return true;
    });
  })();
    
  return (
    <Link 
      href={`/${type}s/${slug}`} 
      className="block h-full group"
    >
      <div
        ref={cardRef}
        className={`relative h-fit bg-white rounded-tr-4xl rounded-bl-4xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 group-hover:border-tr-none group-hover:border-bl-none ${
          isInView 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}
        style={{
          transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease'
        }}
      >
        {image && (
          <div className="relative h-60 w-full overflow-hidden">
            <Image
              ref={imageRef}
              src={getStrapiMedia(image) || (type === 'event' ? '/assets/jpg/events.jpg' : '/assets/jpg/insights.jpg')}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="p-6">
          {category && (
            <div className="mb-3">
              <span className="px-3 py-1 bg-nexia-light-teal-100 text-nexia-dark-teal-100 text-sm font-medium rounded-full">
                {category}
              </span>
            </div>
          )}

          {datePublished && (
            <p className="text-sm text-gray-600 mb-3">
              {new Date(datePublished).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}

          <h3 className="text-xl font-bold text-nexia-dark-teal-100 mb-3 line-clamp-2 group-hover:text-nexia-light-teal-100 transition-colors">
            {title}
          </h3>

          {description && (
            <p className="text-gray-600 text-sm line-clamp-3">
              {description.replace(/<[^>]*>/g, '')} {/* Strip HTML tags */}
            </p>
          )}
          {tagItems.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tagItems.map((t) => (
                <Link
                  key={`${t.href}-${t.label}`}
                  href={t.href}
                  className="px-2.5 py-1 bg-nexia-light-teal-100 text-nexia-dark-teal-100 text-xs font-medium rounded-full hover:bg-nexia-light-teal-200 transition-colors"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center text-nexia-dark-teal-100 font-medium text-sm group-hover:text-nexia-light-teal-100 transition-colors">
            Read More
            <svg 
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// Main Client Component
type PaginatedItem = (EventData | FlatEvent | InsightData | FlatInsight) & { type: 'event' | 'insight' };
type PaginationInfo = { totalItems: number; totalPages: number; currentPage: number; pageSize: number };

export default function TagPageClient({ params, initialContent, paginatedContent, pagination }: { params: { slug: string }; initialContent: ContentByTagResponse; paginatedContent?: PaginatedItem[]; pagination?: PaginationInfo }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Animate title
    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      },
      {
        start: "top 80%",
        end: "bottom 20%",
      },
    );
  }, []);

  // normalize content arrays from either shape
  const eventsArray: Array<EventData | FlatEvent> = Array.isArray((initialContent as { events?: unknown })?.events)
    ? ((initialContent as { events: Array<EventData | FlatEvent> }).events)
    : ((((initialContent as { events?: { data?: Array<EventData> } })?.events?.data) || []));

  const insightsArray: Array<InsightData | FlatInsight> = Array.isArray((initialContent as { insights?: unknown })?.insights)
    ? ((initialContent as { insights: Array<InsightData | FlatInsight> }).insights)
    : ((((initialContent as { insights?: { data?: Array<InsightData> } })?.insights?.data) || []));

  const allContent = [
    ...eventsArray.map(item => ({ ...item, type: 'event' as const })),
    ...insightsArray.map(item => ({ ...item, type: 'insight' as const }))
  ];

  // Prefer server-provided pagination; fall back to client-side if not provided
  const searchParams = useSearchParams();
  const router = useRouter();
  const serverPaging = Boolean(pagination && paginatedContent);
  const fallbackPageSize = 9;
  const fallbackTotalItems = allContent.length;
  const fallbackTotalPages = Math.max(1, Math.ceil(fallbackTotalItems / fallbackPageSize));
  const fallbackCurrentPage = useMemo(() => {
    const p = parseInt(searchParams?.get('page') || '1', 10);
    if (Number.isNaN(p) || p < 1) return 1;
    if (p > fallbackTotalPages) return fallbackTotalPages;
    return p;
  }, [searchParams, fallbackTotalPages]);

  const pageSize = serverPaging ? pagination!.pageSize : fallbackPageSize;
  const totalPages = serverPaging ? pagination!.totalPages : fallbackTotalPages;
  const currentPage = serverPaging ? pagination!.currentPage : fallbackCurrentPage;

  const visibleContent: PaginatedItem[] = serverPaging
    ? (paginatedContent as PaginatedItem[])
    : (allContent.slice((currentPage - 1) * pageSize, (currentPage - 1) * pageSize + pageSize) as PaginatedItem[]);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (page <= 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    router.push(`?${params.toString()}`);
  };

  if (allContent.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-nexia-dark-teal-100 mb-4">No Content Found</h1>
          <p className="text-gray-600">No content found for the tag &quot;{params.slug}&quot;</p>
          <Link 
            href="/insights" 
            className="inline-block mt-4 px-6 py-2 bg-nexia-dark-teal-100 text-white rounded hover:bg-nexia-light-teal-100 transition-colors"
          >
            Browse All Content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-nexia-dark-teal-100 py-16">
        <Bounded>
          <div className="">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl font-light font-effra-light text-white mb-4"
            >
              Content tagged with &quot;{params.slug}&quot;
            </h1>
          </div>
        </Bounded>
      </section>

      {/* Content Grid */}
      <section ref={sectionRef} className="py-16">
        <Bounded>
          <div 
            ref={gridRef}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visibleContent.map((item) => (
              <ContentCard
                key={`${item.type}-${item.id}`}
                item={item}
                type={item.type}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => goToPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={`page-${pageNum}`}
                    onClick={() => goToPage(pageNum)}
                    className={`px-3 py-1 border rounded transition-colors ${
                      isActive 
                        ? 'bg-nexia-dark-teal-100 text-white border-nexia-dark-teal-100' 
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </Bounded>
      </section>
    </div>
  );
}
import type { Metadata } from "next";

export async function generateMetadata(
  { searchParams }: { searchParams: { s?: string } }
): Promise<Metadata> {
  const query = (searchParams?.s || "").toString().trim();
  const title = query
    ? `Search results for "${query}" | Nexia Agbo Abel & Co`
    : "Search | Nexia Agbo Abel & Co";
  const description = query
    ? `Explore results related to "${query}" across Nexia Agbo Abel & Co.`
    : "Search Nexia Agbo Abel & Co for services, insights, events and more.";
  const url = query
    ? `https://nexia.ng/search?s=${encodeURIComponent(query)}`
    : `https://nexia.ng/search`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: query ? undefined : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Nexia Agbo Abel & Co",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}




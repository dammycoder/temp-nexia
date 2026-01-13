
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | Nexia Agbo Abel & Co",
  description: "Search Nexia Agbo Abel & Co for services, insights, events and more.",
  alternates: { canonical: "https://nexia.ng/search" },
  openGraph: {
    title: "Search | Nexia Agbo Abel & Co",
    description: "Search Nexia Agbo Abel & Co for services, insights, events and more.",
    url: "https://nexia.ng/search",
    type: "website",
    siteName: "Nexia Agbo Abel & Co",
  },
  twitter: {
    card: "summary",
    title: "Search | Nexia Agbo Abel & Co",
    description: "Search Nexia Agbo Abel & Co for services, insights, events and more.",
  },
};
export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}




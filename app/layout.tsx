import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./global.css";

import { effra, taho } from "@/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms | Nexia",
  description:
    "Nexia is a leading global network of independent accounting & consulting firms. Personal connections, global solutions. We are Nexia. Get in touch.",
  keywords: [
    "Nexia",
    "global accounting network",
    "consulting firms",
    "independent firms",
    "auditing",
    "business advisory",
  ],
  metadataBase: new URL ('https://nexia.ng'),
  referrer: 'origin-when-cross-origin',
  openGraph: {
    title: "Nexia Agbo Abel & Co - Global Network of Accounting & Consulting Firms",
    description:
      "Nexia is a leading global network of independent accounting & consulting firms. Personal connections, global solutions. We are Nexia. Get in touch.",
    url: "https://www.nexia.ng",
    siteName: "Nexia Agbo Abel & Co",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Nexia Global Network",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body
        className={`${effra.variable} ${taho.variable} ${geistSans.variable} ${geistMono.variable}  antialiased `}
      >
        {children}
        <Script
          src="https://cookiechimp.com/widget/VWGtgDZ.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}

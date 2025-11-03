import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./global.css";
import Footer from "@/_components/organisms/o-footer";
import { Toaster } from "@/components/ui/sonner"


import { effraRegular, effraLight, effraBold, taho } from "@/fonts";
import HeaderWrapper from "@/_components/organisms/o-header/HeaderWrapper";

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
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title:
    "Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms | Nexia",
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
  metadataBase: new URL("https://nexia.ng"),
  referrer: "origin-when-cross-origin",
  openGraph: {
    title:
      "Nexia Agbo Abel & Co - Global Network of Accounting & Consulting Firms",
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
        className={` ${effraLight.variable} ${effraRegular.variable} ${effraBold.variable} ${taho.variable}${taho.variable} ${geistSans.variable} ${geistMono.variable} antialiased max-w-9xl overflow-x-clip mx-auto `}
      >
        <HeaderWrapper />

        {children}

        <Footer />
          <Toaster richColors position="top-right" />

        <Script
          src="https://cookiechimp.com/widget/8J5tVJZ.js"
          strategy="beforeInteractive"
        />
         <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}

"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("error caught:", error);
  }, [error]);

  return (
    <html>
      <body className="flex flex-col items-center justify-center h-screen text-center ">
        <Image
          src="/error.png"
          alt="Global error"
          width={280}
          height={280}
        />
        <h1 className="text-3xl font-semibold mt-6 ">
          Something went wrong
        </h1>
        <p className=" mt-2 max-w-md">
          We&apos;re working on fixing it. Please try again or refresh the page.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 px-5 py-2 bg-primary text-white rounded-[4px] hover:bg-primary/10"
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
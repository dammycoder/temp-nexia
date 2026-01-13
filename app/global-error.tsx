"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("error caught:", error);
  }, [error]);

  return (
    <html>
      <body className="text-nexia-dark-teal-100 flex flex-col items-center justify-center h-screen text-center ">
        <h1 className="text-3xl font-semibold mt-6 ">
          Something went wrong
        </h1>
        <p className=" mt-2 max-w-md text-nexia-gray ">
          We&apos;re working on fixing it. Please try again or refresh the page.
        </p>
      
      
      </body>
    </html>
  );
}
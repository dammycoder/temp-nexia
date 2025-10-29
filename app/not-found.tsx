import React from "react";
import Link from "next/link";
// import HeaderWrapper from "@/_components/organisms/o-header/HeaderWrapper";
// import Footer from "@/_components/organisms/o-footer";

const Notfound = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-nexia-dark-teal-100">
      {/* Header */}
      

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-6 py-8">
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="max-w-md mb-8">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>

        <div className="bg-gray-100 p-6 rounded-xl max-w-lg w-full">
          <h3 className="text-xl font-semibold mb-4">
            Here are some helpful links:
          </h3>

          <div className="flex flex-col gap-3">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/services" className="hover:underline">
              Services
            </Link>
            <Link href="/contact-us" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
   
    </div>
  );
};

export default Notfound;

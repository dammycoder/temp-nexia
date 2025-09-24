// components/layouts/HomeLayout.tsx
import type { ReactNode } from "react";
import HeaderWrapper from "@/components/organisms/o-header/HeaderWrapper";
import Footer from "@/components/organisms/o-footer";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <div>
      <HeaderWrapper />
      <main className="">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import React from "react";
import { cn } from "@/_lib/utils";
import Link from "next/link";
import Image from "next/image";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 cursor-pointer",
        className
      )}
    >
      <Image
        src="/assets/png/logo.png"
        alt="Company Logo"
        width={240} 
        height={120}
        priority
        quality={100} 
        className="object-contain w-[140px] md:w-[160px] lg:w-[180px] h-auto"
      />
    </Link>
  );
};

export default Logo;

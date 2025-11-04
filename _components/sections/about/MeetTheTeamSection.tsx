"use client";

import React, { useEffect, useRef } from "react";
import { Bounded } from "@/_components/bouned";
import Image from "next/image";
import { scrollAnimations, animations } from "@/_lib/animations";
import { getStrapiMedia } from "@/_lib/utils";
import Link from "next/link";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  slug: string;
  image: {
    id: number;
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
  };
  order: number;
}

interface Props {
  data: TeamMember[];
}

const TeamMemberCard: React.FC<{ member: TeamMember; index: number }> = ({
  member,
  index,
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    scrollAnimations.onScroll(
      cardRef.current,
      {
        from: { opacity: 0, y: 80, scale: 0.8 },
        to: {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.15,
        },
      },
      {
        start: "top 85%",
        end: "bottom 15%",
      },
    );

    // Add hover animation
    const card = cardRef.current;
    const image = card.querySelector("img");

    if (image) {
      const cleanup = animations.hoverScale(image, 1.05);
      return cleanup;
    }
  }, [index]);

  return (
    <Link href={`/about/leadership/${member.slug}`} ref={cardRef} className="flex flex-col">
      <div className="group relative aspect-[3/4] w-full">
        <Image
          src={getStrapiMedia(member?.image?.url) || "/assets/jpg/profile-placeholder.svg"}
          alt={member?.name}
          fill
          className="cursor-pointer rounded-tr-4xl rounded-bl-4xl object-cover transition-all duration-500 hover:rounded-none"
        />
      </div>

      <div className="mt-3 flex flex-col">
        <span className="text-xl font-bold text-nexia-dark-teal-100">
          {member.name}
        </span>
        <span className="font-effra font-medium text-nexia-gray">
          {member.position}
        </span>
      </div>
    </Link>
  );
};

const MeetTheTeamSection = ({ data }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const sortedTeamMembers = [...data].sort((a, b) => a.order - b.order);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      },
      {
        start: "top 80%",
        end: "bottom 20%",
      },
    );
  }, []);

  return (
    <Bounded
      ref={sectionRef}
      id="about-us-partners"
      className="flex flex-col gap-3 py-8"
    >
      <h2 ref={titleRef} className="text-xl font-bold">
        Meet the Team
      </h2>
      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] gap-6 sm:grid-cols-2 sm:gap-8 md:gap-10 lg:grid-cols-3 xl:grid-cols-4">
        {sortedTeamMembers.map((member, index) => (
          <TeamMemberCard key={member?.id} member={member} index={index} />
        ))}
      </div>
    </Bounded>
  );
};

export default MeetTheTeamSection;
"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { scrollAnimations } from "@/_lib/animations";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Bounded } from "@/_components/bouned";
import Image from "next/image";
import { getStrapiMedia } from "@/_lib/utils";

// Types based on your Strapi schema
interface Chair {
  readonly id: number;
  readonly image: { url: string };
  readonly name: string;
  readonly position: string;
}

interface SubItem {
  readonly id: number;
  readonly title: string;
  readonly content: string;
}

interface ServiceInfo {
  readonly id: number;
  readonly title: string;
  readonly content: string;
  readonly subItems: readonly SubItem[];
}

interface Service {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly chair: Chair;
  readonly slug: string;
  readonly info: readonly ServiceInfo[];
}

interface ServiceContentProps {
  readonly service: Service;
}

interface ServiceSectionProps {
  readonly id: string;
  readonly title: string;
  readonly children: React.ReactNode;
  readonly level?: 2 | 3; 
}

const ServiceSection = memo<ServiceSectionProps>(({
  id,
  title,
  children,
  level = 2,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const titleAnimation = scrollAnimations.onScroll(
      titleRef.current,
      {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      },
      { start: "top 80%", end: "bottom 20%" }
    );

    const contentAnimation = scrollAnimations.onScroll(
      contentRef.current,
      {
        from: { opacity: 0, y: 50 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 },
      },
      { start: "top 80%", end: "bottom 20%" }
    );

    return () => {
      titleAnimation.kill();
      contentAnimation.kill();
    };
  }, []);

  const titleClasses = useMemo(
    () =>
      level === 2
        ? "text-2xl md:text-3xl font-bold mb-4 text-nexia-dark-teal-100"
        : "text-lg md:text-xl font-semibold mb-3 text-nexia-dark-teal-100",
    [level]
  );

  const TitleTag = `h${level}` as const;

  return (
    <section id={id} className="scroll-mt-20 md:scroll-mt-24" ref={sectionRef}>
      {React.createElement(
        TitleTag,
        { className: titleClasses, ref: titleRef },
        title
      )}
      <div ref={contentRef} className="prose prose-gray max-w-none">
        {children}
      </div>
    </section>
  );
});

ServiceSection.displayName = 'ServiceSection';

interface NavigationItem {
  readonly name: string;
  readonly id: string;
  readonly children?: readonly NavigationItem[];
}

interface MobileNavProps {
  readonly navigationItems: readonly NavigationItem[];
  readonly activeId: string;
  readonly onNavigate: (id: string) => void;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

const MobileNav = memo<MobileNavProps>(({
  navigationItems,
  activeId,
  onNavigate,
  isOpen,
  onToggle,
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = useCallback((serviceId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId);
      } else {
        newSet.add(serviceId);
      }
      return newSet;
    });
  }, []);

  const handleServiceClick = useCallback((serviceId: string) => {
    onNavigate(serviceId);
    onToggle();
  }, [onNavigate, onToggle]);

  const handleChildClick = useCallback((childId: string) => {
    onNavigate(childId);
    onToggle();
  }, [onNavigate, onToggle]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white md:hidden">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Services Menu</h2>
        <button 
          onClick={onToggle} 
          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="overflow-y-auto p-4 h-full pb-20">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleServiceClick(item.id)}
                  className={`flex-1 text-left py-3 px-2 font-semibold rounded-lg transition-colors ${
                    activeId === item.id
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </button>
                {item.children && (
                  <button
                    onClick={() => toggleSection(item.id)}
                    className="p-2 text-nexia-dark-teal-100 hover:text-nexia-dark-teal-80 transition-colors"
                    aria-label={`Toggle ${item.name} submenu`}
                  >
                    {expandedSections.has(item.id) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>

              {item.children && expandedSections.has(item.id) && (
                <ul className="ml-4 mt-2 space-y-1">
                  {item.children.map((child) => (
                    <li key={child.id}>
                      <button
                        onClick={() => handleChildClick(child.id)}
                        className={`block text-sm w-full text-left py-2 px-3 rounded-md transition-colors ${
                          activeId === child.id
                            ? "text-primary bg-primary/10"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {child.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
});

MobileNav.displayName = 'MobileNav';

interface DesktopNavProps {
  readonly navigationItems: readonly NavigationItem[];
  readonly activeId: string;
  readonly onNavigate: (id: string) => void;
}

const DesktopNav = memo<DesktopNavProps>(({
  navigationItems,
  activeId,
  onNavigate,
}) => (
  <nav className="hidden md:block sticky top-24 self-start">
    <ul className="space-y-3">
      {navigationItems.map((item) => (
        <li key={item.id}>
          <button
            onClick={() => onNavigate(item.id)}
            className={`block text-left w-full font-semibold py-2 rounded-md transition-colors ${
              activeId === item.id
                ? "text-nexia-light-teal-100"
                : "text-nexia-dark-teal-100 hover:text-nexia-light-teal-100"
            }`}
          >
            {item.name}
          </button>
          {item.children && (
            <ul className="ml-4 mt-2 space-y-1">
              {item.children.map((child) => (
                <li key={child.id}>
                  <button
                    onClick={() => onNavigate(child.id)}
                    className={`block text-sm w-full text-left py-1.5 px-3 rounded-md transition-colors ${
                      activeId === child.id
                        ? "text-nexia-light-teal-100"
                        : "text-nexia-dark-teal-100 hover:text-nexia-light-teal-100"
                    }`}
                  >
                    {child.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
));

DesktopNav.displayName = 'DesktopNav';

const useScrollSpy = () => {
  const [activeId, setActiveId] = useState<string>("");

  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    let current = "";

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const offset = window.innerWidth >= 768 ? 120 : 100;

      if (rect.top <= offset && rect.bottom >= offset) {
        current = section.id;
        break;
      }
    }

    setActiveId(current);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = null;
      }, 100);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  return activeId;
};

export default function ServiceContent({ service }: ServiceContentProps) {
  const activeId = useScrollSpy();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Generate navigation items from service data
  const navigationItems: NavigationItem[] = useMemo(() => {
    const items: NavigationItem[] = [
      {
        name: service.title,
        id: `service-${service.id}`,
      }
    ];

    // Add info sections to navigation
    service.info.forEach((info) => {
      const children = info.subItems.map((subItem) => ({
        name: subItem.title,
        id: `subitem-${subItem.id}`,
      }));

      items.push({
        name: info.title,
        id: `info-${info.id}`,
        children: children.length > 0 ? children : undefined,
      });
    });

    // Add chair section
    items.push({
      name: "Chair",
      id: "chair",
    });

    return items;
  }, [service]);

  const handleNavigation = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = window.innerWidth >= 768 ? 120 : 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }, []);

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen(prev => !prev);
  }, []);

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-40">
        <button
          onClick={toggleMobileNav}
          className="p-3 bg-white shadow-lg rounded-lg border hover:shadow-xl transition-shadow"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
      </div>

      <MobileNav
        navigationItems={navigationItems}
        activeId={activeId}
        onNavigate={handleNavigation}
        isOpen={isMobileNavOpen}
        onToggle={toggleMobileNav}
      />

      <Bounded className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 md:gap-8 lg:gap-12 py-8 md:py-12">
        <DesktopNav
          navigationItems={navigationItems}
          activeId={activeId}
          onNavigate={handleNavigation}
        />

        <main className="space-y-12 md:space-y-16 min-w-0">
          {/* Main Service Section */}
          <ServiceSection id={`service-${service.id}`} title={service.title}>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              {service.description}
            </p>
          </ServiceSection>

          {/* Service Info Sections */}
          {service.info.map((info) => (
            <div key={info.id} className="space-y-8">
              <ServiceSection id={`info-${info.id}`} title={info.title}>
                <div 
                  className="text-gray-700 leading-relaxed text-base md:text-lg prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: info.content }}
                />
              </ServiceSection>

              {/* Sub Items */}
              {info.subItems.map((subItem) => (
                <ServiceSection
                  key={subItem.id}
                  id={`subitem-${subItem.id}`}
                  title={subItem.title}
                  level={3}
                >
                  <div 
                    className="text-gray-600 leading-relaxed prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ __html: subItem.content }}
                  />
                </ServiceSection>
              ))}
            </div>
          ))}

          {/* Chair Section */}
          <ServiceSection id="chair" title="Chair">
            <div className="mt-3 w-full lg:max-w-[500px] bg-nexia-dark-teal-100 p-4 flex rounded-lg gap-5">
              <Image 
                src={getStrapiMedia(service?.chair?.image?.url) || "/assets/png/abel.png"} 
                width={100} 
                height={100} 
                alt={service.chair.name}
                className="object-cover rounded-lg size-[130px]"
              />
              <div className="text-white w-1/2"> 
                <p className="text-2xl">{service.chair.name}</p>
                <p className="text-nexia-light-teal-100 text-lg">{service.chair.position}</p>
                <button className="bg-nexia-light-teal-100 text-nexia-dark-teal-100 rounded-full py-2 px-4 mt-6">
                  View Profile
                </button>
              </div>
            </div>
          </ServiceSection>
        </main>
      </Bounded>
    </>
  );
}
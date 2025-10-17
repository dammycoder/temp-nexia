import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Common animation configurations
export const animationConfig = {
  // Easing functions
  ease: {
    smooth: "power3.out",
    bouncy: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
    quick: "power2.out",
  },
  
  // Duration presets
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    verySlow: 1.5,
  },
  
  // Scroll trigger defaults
  scrollTrigger: {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none none",
  },
};

// Common animation functions
export const animations = {
  // Fade in from bottom
  fadeInUp: (element: gsap.TweenTarget, options = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        ...options,
      }
    );
  },

  // Fade in from left
  fadeInLeft: (element: gsap.TweenTarget, options = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        ...options,
      }
    );
  },

  // Fade in from right
  fadeInRight: (element: gsap.TweenTarget, options = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        ...options,
      }
    );
  },

  // Scale in animation
  scaleIn: (element: gsap.TweenTarget, options = {}) => {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.bouncy,
        ...options,
      }
    );
  },

  // Stagger animation for multiple elements
  staggerIn: (elements: gsap.TweenTarget[], options = {}) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: animationConfig.duration.normal,
        ease: animationConfig.ease.smooth,
        stagger: 0.1,
        ...options,
      }
    );
  },

  // Parallax effect
  parallax: (element: gsap.DOMTarget, yPercent = -50, options = {}) => {
    return gsap.to(element, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        ...options,
      },
    });
  },
  // Hover animations
  hoverScale: (element: HTMLElement, scale = 1.05) => {
    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.quick,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.quick,
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  },

  // Floating animation
  float: (element: gsap.TweenTarget, y = -10, duration = 2) => {
    return gsap.to(element, {
      y,
      duration,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  },
};

// Scroll-triggered animation helpers
export const scrollAnimations = {
  // Basic scroll trigger animation
  onScroll: (
    element: gsap.TweenTarget,
    animation: gsap.TweenVars,
    triggerOptions = {}
  ) => {
    return gsap.fromTo(
      element,
      animation.from || { opacity: 0, y: 50 },
      {
        ...animation.to || { opacity: 1, y: 0 },
        scrollTrigger: {
          trigger: element,
          ...animationConfig.scrollTrigger,
          ...triggerOptions,
        },
      }
    );
  },

  // Timeline with scroll trigger
  timelineOnScroll: (
    elements: gsap.DOMTarget[], 
    timeline: gsap.TimelineVars,
    triggerOptions = {}
  ) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: elements[0],
        ...animationConfig.scrollTrigger,
        ...triggerOptions,
      },
      ...timeline,
    });
  
    return tl;
  },
  
};

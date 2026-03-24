"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  stagger?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article";
}

export function ScrollReveal({
  children,
  delay = 0,
  stagger = 0,
  y = 24,
  className,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !ref.current) return;

      // Set initial state via GSAP (not CSS) to avoid invisible content without JS
      const targets =
        stagger > 0 ? ref.current.children : [ref.current];

      gsap.set(targets, { opacity: 0, y });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: ref, dependencies: [delay, stagger, y, reducedMotion] },
  );

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  );
}

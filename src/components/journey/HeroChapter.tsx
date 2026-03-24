"use client";

import { useRef, type MutableRefObject } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MetricCounter } from "./MetricCounter";
import {
  heroMetrics,
  heroNarrative,
  chapters,
} from "@/data/journey";
import { ChevronDown } from "lucide-react";

interface HeroChapterProps {
  activeChapterRef: MutableRefObject<number>;
}

export function HeroChapter({ activeChapterRef }: HeroChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const narrativeRef = useRef<HTMLParagraphElement>(null);
  const scrollPromptRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Chapter tracking
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          activeChapterRef.current = 0;
        },
        onEnterBack: () => {
          activeChapterRef.current = 0;
        },
      });

      if (reducedMotion) return;

      // SplitText kinetic typography
      if (titleRef.current) {
        const split = new SplitText(titleRef.current, { type: "chars" });
        gsap.from(split.chars, {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
        });
      }

      // Subtitle fade-in after title
      if (subtitleRef.current) {
        gsap.from(subtitleRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          delay: 0.8,
          ease: "power2.out",
        });
      }

      // Narrative fade-in
      if (narrativeRef.current) {
        gsap.from(narrativeRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          delay: 1.1,
          ease: "power2.out",
        });
      }

      // Hide scroll prompt after 10% scroll
      if (scrollPromptRef.current) {
        ScrollTrigger.create({
          trigger: document.body,
          start: "10% top",
          onEnter: () => {
            gsap.to(scrollPromptRef.current, {
              opacity: 0,
              duration: 0.3,
            });
          },
          onLeaveBack: () => {
            gsap.to(scrollPromptRef.current, {
              opacity: 1,
              duration: 0.3,
            });
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      data-chapter={chapters[0].id}
      id={`chapter-${chapters[0].id}`}
      aria-labelledby="hero-heading"
      className="relative flex min-h-svh flex-col items-center justify-center bg-background px-8 py-16"
    >
      <div className="flex max-w-[1200px] flex-col items-center gap-6 text-center">
        <h1
          ref={titleRef}
          id="hero-heading"
          className="font-display text-48 font-bold text-text-primary md:text-64"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Dhiman Seal
        </h1>

        <p
          ref={subtitleRef}
          className="text-20 font-medium text-text-secondary"
        >
          Software Engineer{" "}
          <span className="text-text-quaternary">/</span> Entrepreneur{" "}
          <span className="text-text-quaternary">/</span> Builder
        </p>

        {/* Narrative hook */}
        <p
          ref={narrativeRef}
          className="max-w-[640px] text-16 text-text-tertiary"
        >
          {heroNarrative}
        </p>

        {/* Metric ticker strip */}
        <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {heroMetrics.map((metric) => (
            <MetricCounter
              key={metric.label}
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
      </div>

      {/* Scroll prompt */}
      <div
        ref={scrollPromptRef}
        className="absolute bottom-8 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-12 uppercase tracking-widest text-text-quaternary">
          Scroll to begin
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce text-text-quaternary" />
      </div>
    </section>
  );
}

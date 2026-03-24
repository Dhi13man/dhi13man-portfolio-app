"use client";

import { useRef, type MutableRefObject } from "react";
import ExportedImage from "next-image-export-optimizer";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollReveal } from "./ScrollReveal";
import { chapters, growwNarrative, growwRoles } from "@/data/journey";
import { cn } from "@/lib/utils";

interface GrowwChapterProps {
  activeChapterRef: MutableRefObject<number>;
}

export function GrowwChapter({ activeChapterRef }: GrowwChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isDesktop =
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false;

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Chapter tracking
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          activeChapterRef.current = 2;
        },
        onEnterBack: () => {
          activeChapterRef.current = 2;
        },
      });

      if (reducedMotion) return;

      // Horizontal scroll only on desktop
      if (
        isDesktop &&
        horizontalRef.current &&
        cardsRef.current &&
        progressRef.current
      ) {
        const cards = cardsRef.current;
        const totalWidth = cards.scrollWidth - window.innerWidth;

        gsap.to(cards, {
          x: -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: horizontalRef.current,
            start: "top top",
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [reducedMotion, isDesktop] },
  );

  const chapter = chapters[2];

  return (
    <section
      ref={sectionRef}
      data-chapter={chapter.id}
      id={`chapter-${chapter.id}`}
      aria-labelledby="groww-heading"
      className="bg-surface"
    >
      {/* Intro */}
      <div className="mx-auto max-w-[1200px] px-8 py-16 md:py-24">
        <ScrollReveal className="flex flex-col gap-6">
          <span className="text-12 uppercase tracking-widest text-text-quaternary">
            {chapter.label}
          </span>
          <div className="flex items-center gap-4">
            {growwNarrative.logo && (
              <a
                href={growwNarrative.link}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                <ExportedImage
                  src={growwNarrative.logo}
                  alt="Groww"
                  width={48}
                  height={48}
                  className="rounded-lg bg-white p-1"
                />
              </a>
            )}
            <h2
              id="groww-heading"
              className="font-display text-32 font-bold text-text-primary"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {chapter.title}
            </h2>
          </div>
          <p className="max-w-[640px] text-20 leading-relaxed text-text-secondary">
            {growwNarrative.lead}
          </p>
        </ScrollReveal>
      </div>

      {/* Desktop: horizontal scroll */}
      {isDesktop && !reducedMotion ? (
        <div ref={horizontalRef} className="relative min-h-svh overflow-hidden">
          {/* Timeline progress line */}
          <div className="absolute left-0 right-0 top-8 mx-auto h-[1px] max-w-[calc(100%-64px)] bg-border">
            <div
              ref={progressRef}
              className="h-full origin-left bg-accent"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
          {/* Timeline dots */}
          <div className="absolute left-0 right-0 top-8 mx-auto flex max-w-[calc(100%-64px)] justify-between px-8">
            {growwRoles.map((role, i) => (
              <div key={role.title} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "h-3 w-3 rounded-full border-2",
                    i === growwRoles.length - 1
                      ? "border-accent bg-accent"
                      : "border-accent bg-background",
                  )}
                />
                <span className="font-mono text-12 text-text-quaternary">
                  {role.date.split(" – ")[0]}
                </span>
              </div>
            ))}
          </div>

          {/* Cards container */}
          <div
            ref={cardsRef}
            className="flex gap-8 px-16 pt-24"
            style={{ width: `${growwRoles.length * 560 + 128}px` }}
          >
            {growwRoles.map((role) => (
              <RoleCard key={role.title} role={role} />
            ))}
          </div>
        </div>
      ) : (
        /* Mobile / reduced motion: vertical stack */
        <div className="mx-auto max-w-[1200px] px-8 pb-16">
          <div className="relative border-l-2 border-border pl-8">
            {growwRoles.map((role, i) => (
              <div
                key={role.title}
                className={cn("relative pb-8", i === growwRoles.length - 1 && "pb-0")}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute -left-[calc(1rem+5px)] top-1 h-3 w-3 rounded-full border-2",
                    i === growwRoles.length - 1
                      ? "border-accent bg-accent"
                      : "border-accent bg-background",
                  )}
                />
                <RoleCard role={role} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function RoleCard({ role }: { role: (typeof growwRoles)[number] }) {
  return (
    <article className="w-full min-w-[320px] max-w-[560px] rounded border border-border bg-background p-6 transition-all duration-fast hover:border-border-hover lg:min-w-[480px]">
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <h3 className="text-24 font-semibold text-text-primary">
          {role.title}
        </h3>
        <span className="shrink-0 font-mono text-12 text-text-quaternary">
          {role.date}
        </span>
      </div>
      <p className="mb-4 text-14 text-text-secondary">{role.description}</p>

      {/* Metric pills */}
      <div className="mb-4 flex flex-wrap gap-2">
        {role.pills.map((pill) => (
          <span
            key={pill}
            className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-12 text-accent"
          >
            {pill}
          </span>
        ))}
      </div>

      {/* Detail bullets */}
      <ul className="space-y-2">
        {role.details.map((detail) => (
          <li
            key={detail}
            className="flex items-start gap-2 text-14 text-text-tertiary"
          >
            <span
              className="shrink-0 font-bold text-accent"
              aria-hidden="true"
            >
              &rarr;
            </span>
            {detail}
          </li>
        ))}
      </ul>
    </article>
  );
}

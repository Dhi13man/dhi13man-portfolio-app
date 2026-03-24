"use client";

import { useRef, type MutableRefObject } from "react";
import ExportedImage from "next-image-export-optimizer";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollReveal } from "./ScrollReveal";
import { chapters, venturesNarrative, ventures } from "@/data/journey";
import { cn } from "@/lib/utils";
import type { VentureEntry } from "@/data/journey";

interface VenturesChapterProps {
  activeChapterRef: MutableRefObject<number>;
}

export function VenturesChapter({ activeChapterRef }: VenturesChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          activeChapterRef.current = 3;
        },
        onEnterBack: () => {
          activeChapterRef.current = 3;
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const chapter = chapters[3];

  return (
    <section
      ref={sectionRef}
      data-chapter={chapter.id}
      id={`chapter-${chapter.id}`}
      aria-labelledby="ventures-heading"
      className="bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-8">
        <ScrollReveal className="mb-12 flex flex-col gap-6">
          <span className="text-12 uppercase tracking-widest text-text-quaternary">
            {chapter.label}
          </span>
          <h2
            id="ventures-heading"
            className="font-display text-32 font-bold text-text-primary"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {chapter.title}
          </h2>
          <p className="max-w-[640px] text-20 leading-relaxed text-text-secondary">
            {venturesNarrative.lead}
          </p>
        </ScrollReveal>

        {/* Venture cards: AgriJod full-width, rest in 2-col grid */}
        <div className="flex flex-col gap-4">
          {/* AgriJod - full width, special treatment */}
          <VentureCard venture={ventures[0]} reducedMotion={reducedMotion} />

          {/* Remaining ventures in grid */}
          <ScrollReveal
            stagger={0.08}
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {ventures.slice(1).map((venture) => (
              <VentureCard
                key={venture.name}
                venture={venture}
                reducedMotion={reducedMotion}
              />
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function VentureCard({
  venture,
  reducedMotion,
}: {
  venture: VentureEntry;
  reducedMotion: boolean;
}) {
  const cardRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (venture.status !== "acquired" || reducedMotion || !cardRef.current)
        return;

      // Glow animates in after card is visible
      gsap.fromTo(
        cardRef.current,
        { boxShadow: "0 0 0px rgba(139, 92, 246, 0), 0 0 0px rgba(139, 92, 246, 0)" },
        {
          boxShadow:
            "0 0 20px rgba(139, 92, 246, 0.15), 0 0 40px rgba(139, 92, 246, 0.05)",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: cardRef, dependencies: [venture.status, reducedMotion] },
  );

  const isAcquired = venture.status === "acquired";
  const isClosed = venture.status === "closed";

  const content = (
    <article
      ref={cardRef}
      className={cn(
        "block overflow-hidden rounded transition-all duration-fast",
        isAcquired && "border border-accent bg-background",
        isAcquired &&
          reducedMotion &&
          "shadow-[0_0_20px_rgba(139,92,246,0.15),0_0_40px_rgba(139,92,246,0.05)]",
        isClosed && "border border-[rgba(255,255,255,0.04)] bg-background",
        !isAcquired &&
          !isClosed &&
          "border border-border bg-surface hover:border-border-hover hover:bg-hover-bg",
      )}
    >
      {/* Image - clicks open in new tab, not the card link */}
      {venture.image && (
        <div className="relative w-full overflow-hidden">
          <button
            type="button"
            className={cn(
              "relative w-full cursor-zoom-in overflow-hidden",
              isAcquired ? "h-[200px]" : "h-[140px]",
            )}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.open(venture.image!, "_blank");
            }}
            aria-label={`View ${venture.name} image`}
          >
            <ExportedImage
              src={venture.image}
              alt={venture.name}
              fill
              className={cn(
                "object-cover",
                isAcquired && "object-top",
                isClosed && "opacity-[0.85]",
              )}
              sizes={
                isAcquired
                  ? "(max-width: 768px) calc(100vw - 64px), 1136px"
                  : "(max-width: 768px) calc(100vw - 64px), 360px"
              }
              loading="lazy"
            />
          </button>
          {isClosed && venture.name === "OnlyForms" && (
            <span className="block px-6 pt-1 text-12 text-text-quaternary">
              Customer delight
            </span>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {venture.badges ? (
            venture.badges.map((b) => (
              <span
                key={b}
                className="rounded-sm border border-accent/20 bg-accent/10 px-3 py-1 text-12 font-semibold text-accent"
              >
                {b}
              </span>
            ))
          ) : (
            <span
              className={cn(
                "rounded-sm px-3 py-1 text-12 font-semibold uppercase tracking-wide",
                isAcquired && "bg-accent text-text-primary",
                isClosed && "bg-surface/50 text-text-quaternary",
                venture.status === "active" &&
                  "border border-accent/20 bg-accent/10 text-accent",
                venture.status === "recognition" &&
                  "border border-accent/20 bg-accent/10 text-accent",
              )}
            >
              {venture.badge}
            </span>
          )}
          <span
            className={cn(
              "text-12",
              isAcquired ? "text-accent" : "text-text-quaternary",
            )}
          >
            {venture.subtitle}
          </span>
        </div>

        <h3
          className={cn(
            "mb-2 text-20 font-semibold",
            isClosed ? "text-text-tertiary" : "text-text-primary",
          )}
        >
          {venture.name}
        </h3>

        <p
          className={cn(
            "text-14",
            isClosed ? "text-text-tertiary italic" : "text-text-secondary",
          )}
        >
          {venture.description}
        </p>

        {venture.details && venture.details.length > 0 && (
          <ul className="mt-3 space-y-1">
            {venture.details.map((detail) => (
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
        )}
      </div>
    </article>
  );

  if (venture.link) {
    return (
      <a href={venture.link} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

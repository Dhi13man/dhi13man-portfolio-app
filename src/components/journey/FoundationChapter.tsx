"use client";

import { useRef, type MutableRefObject } from "react";
import ExportedImage from "next-image-export-optimizer";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollReveal } from "./ScrollReveal";
import {
  chapters,
  foundationNarrative,
  foundationCards,
} from "@/data/journey";

interface FoundationChapterProps {
  activeChapterRef: MutableRefObject<number>;
}

export function FoundationChapter({
  activeChapterRef,
}: FoundationChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
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
          activeChapterRef.current = 1;
        },
        onEnterBack: () => {
          activeChapterRef.current = 1;
        },
      });

      if (reducedMotion || !cardsRef.current) return;

      // Stagger card reveals
      const cards = cardsRef.current.children;
      gsap.set(cards, { opacity: 0, y: 24 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const chapter = chapters[1];

  return (
    <section
      ref={sectionRef}
      data-chapter={chapter.id}
      id={`chapter-${chapter.id}`}
      aria-labelledby="foundation-heading"
      className="bg-surface py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        {/* Narrative column */}
        <ScrollReveal className="flex flex-col gap-6">
          <span className="text-12 uppercase tracking-widest text-text-quaternary">
            {chapter.label}
          </span>
          <h2
            id="foundation-heading"
            className="font-display text-32 font-bold text-text-primary"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            {chapter.title}
          </h2>
          <p className="max-w-[640px] text-20 leading-relaxed text-text-secondary">
            {foundationNarrative.lead}
          </p>
          <blockquote className="my-4 max-w-[640px] border-l-2 border-accent pl-6 text-20 font-medium italic text-text-primary">
            {foundationNarrative.quote}
          </blockquote>
        </ScrollReveal>

        {/* Cards column */}
        <div ref={cardsRef} className="flex flex-col gap-4">
          {foundationCards.map((card) => {
            const CardWrapper = card.link ? "a" : "div";
            const wrapperProps = card.link
              ? { href: card.link, target: "_blank" as const, rel: "noopener noreferrer" as const }
              : {};
            return (
              <CardWrapper
                key={card.title}
                {...wrapperProps}
                className="block rounded border border-border bg-surface p-6 transition-all duration-fast hover:border-border-hover hover:bg-hover-bg"
              >
                {card.image && (
                  <div className="relative mb-4 h-40 w-full overflow-hidden rounded-sm">
                    <ExportedImage
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="mb-2 flex items-baseline justify-between gap-4">
                  <h3 className="text-20 font-semibold text-text-primary">
                    {card.title}
                  </h3>
                  <span className="shrink-0 font-mono text-12 text-text-quaternary">
                    {card.date}
                  </span>
                </div>
                <p className="text-14 text-text-secondary">{card.description}</p>
                {card.details && card.details.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {card.details.map((detail) => (
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
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

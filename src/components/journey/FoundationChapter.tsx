"use client";

import { useRef, useState, type MutableRefObject } from "react";
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
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

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
      <div className="mx-auto max-w-[1200px] px-8">
        {/* Header row: label + title + quote */}
        <ScrollReveal className="mb-8 flex flex-col gap-4">
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
          <p className="max-w-[800px] text-16 leading-relaxed text-text-secondary">
            {foundationNarrative.lead}
          </p>
        </ScrollReveal>

        {/* 2x2 bento grid of cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {foundationCards.map((card) => (
            <a
              key={card.title}
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded border border-border bg-background transition-all duration-fast hover:border-border-hover hover:bg-hover-bg"
            >
              {card.image && (
                <button
                  type="button"
                  className="relative h-36 w-full cursor-zoom-in overflow-hidden"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLightboxSrc(card.image!);
                  }}
                  aria-label={`View ${card.title} image`}
                >
                  <ExportedImage
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </button>
              )}
              <div className="p-4">
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <h3 className="text-16 font-semibold text-text-primary">
                    {card.title}
                  </h3>
                  <span className="shrink-0 font-mono text-12 text-text-quaternary">
                    {card.date}
                  </span>
                </div>
                <p className="text-14 text-text-secondary">
                  {card.description}
                </p>
                {card.details && card.details.length > 0 && (
                  <ul className="mt-2 space-y-0.5">
                    {card.details.slice(0, 3).map((detail) => (
                      <li
                        key={detail}
                        className="flex items-start gap-2 text-12 text-text-tertiary"
                      >
                        <span
                          className="shrink-0 text-accent"
                          aria-hidden="true"
                        >
                          &rarr;
                        </span>
                        {detail}
                      </li>
                    ))}
                    {card.details.length > 3 && (
                      <li className="text-12 text-text-quaternary">
                        +{card.details.length - 3} more
                      </li>
                    )}
                  </ul>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={() => setLightboxSrc(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          tabIndex={0}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <ExportedImage
              src={lightboxSrc}
              alt="Preview"
              width={1200}
              height={800}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}

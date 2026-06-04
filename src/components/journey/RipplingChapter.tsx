"use client";

import { useRef, type MutableRefObject } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollReveal } from "./ScrollReveal";
import { chapters, ripplingNarrative } from "@/data/journey";

const TEXT_WRAP_BALANCE: React.CSSProperties = { textWrap: "balance" } as React.CSSProperties;

interface RipplingChapterProps {
  activeChapterRef: MutableRefObject<number>;
}

export function RipplingChapter({ activeChapterRef }: RipplingChapterProps) {
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
          activeChapterRef.current = 5;
        },
        onEnterBack: () => {
          activeChapterRef.current = 5;
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const chapter = chapters[5];
  const { company } = ripplingNarrative;

  return (
    <section
      ref={sectionRef}
      data-chapter={chapter.id}
      id={`chapter-${chapter.id}`}
      aria-labelledby="rippling-heading"
      className="bg-background py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-8">
        <ScrollReveal className="flex flex-col gap-6">
          <span className="text-12 uppercase tracking-widest text-text-quaternary">
            {chapter.label}
          </span>
          <h2
            id="rippling-heading"
            className="font-display text-32 font-bold text-text-primary"
            style={TEXT_WRAP_BALANCE}
          >
            {chapter.title}
          </h2>
          <p className="max-w-[640px] text-20 leading-relaxed text-text-secondary">
            {ripplingNarrative.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal className="mt-10" delay={0.15}>
          <article className="flex flex-col gap-4 rounded border border-border bg-surface p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-24 font-semibold text-text-primary">
                <a
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  {company.name}
                </a>
              </h3>
              <span className="shrink-0 font-mono text-12 text-text-quaternary">
                {company.date}
              </span>
            </div>
            <p className="text-14 text-text-secondary">{company.about}</p>

            <div className="flex flex-wrap gap-2">
              {ripplingNarrative.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-12 text-accent"
                >
                  {pill}
                </span>
              ))}
            </div>
          </article>
        </ScrollReveal>

        <ScrollReveal className="mt-8" delay={0.3}>
          <p className="max-w-[640px] text-16 italic leading-relaxed text-text-tertiary">
            {ripplingNarrative.closing}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

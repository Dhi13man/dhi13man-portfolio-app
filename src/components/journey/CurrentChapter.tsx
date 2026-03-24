"use client";

import { useRef, type MutableRefObject } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollReveal } from "./ScrollReveal";
import {
  chapters,
  currentNarrative,
  ossHighlights,
  ossSummary,
} from "@/data/journey";

interface CurrentChapterProps {
  activeChapterRef: MutableRefObject<number>;
}

export function CurrentChapter({ activeChapterRef }: CurrentChapterProps) {
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
          activeChapterRef.current = 4;
        },
        onEnterBack: () => {
          activeChapterRef.current = 4;
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] },
  );

  const chapter = chapters[4];
  const { ezhomeo } = currentNarrative;

  return (
    <section
      ref={sectionRef}
      data-chapter={chapter.id}
      id={`chapter-${chapter.id}`}
      aria-labelledby="current-heading"
      className="bg-surface py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Narrative */}
          <ScrollReveal className="flex flex-col gap-6">
            <span className="text-12 uppercase tracking-widest text-text-quaternary">
              {chapter.label}
            </span>
            <h2
              id="current-heading"
              className="font-display text-32 font-bold text-text-primary"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              {chapter.title}
            </h2>
            <p className="text-20 leading-relaxed text-text-secondary">
              {currentNarrative.lead}
            </p>

            {/* EzHomeo details */}
            <div className="rounded border border-border bg-background p-6">
              <h3 className="mb-2 text-20 font-semibold text-text-primary">
                <a
                  href={ezhomeo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:text-accent-hover"
                >
                  {ezhomeo.name}
                </a>
              </h3>
              <p className="mb-4 text-14 text-text-secondary">
                {ezhomeo.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {ezhomeo.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-12 font-medium text-accent"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right column: tech stack + OSS */}
          <ScrollReveal className="flex flex-col gap-6" delay={0.2}>
            {/* Tech stack */}
            <div className="rounded border border-border bg-background p-6">
              <h3 className="mb-4 text-14 font-semibold uppercase tracking-wide text-text-tertiary">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {ezhomeo.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded border border-border bg-surface px-3 py-1.5 text-14 text-text-secondary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* OSS Highlights */}
            <div className="rounded border border-border bg-background p-6">
              <h3 className="mb-4 text-14 font-semibold uppercase tracking-wide text-text-tertiary">
                Open Source
              </h3>
              <p className="mb-4 text-14 text-text-secondary">
                <span className="font-bold text-accent">
                  {ossSummary.projects}
                </span>{" "}
                projects,{" "}
                <span className="font-bold text-accent">
                  {ossSummary.stars}
                </span>{" "}
                GitHub stars
              </p>
              <div className="flex flex-col gap-3">
                {ossHighlights.map((project) => (
                  <div key={project.name} className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-14 font-semibold text-text-primary">
                        {project.link ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent-hover"
                          >
                            {project.name}
                          </a>
                        ) : (
                          project.name
                        )}
                      </h4>
                      {project.metric && (
                        <span className="text-12 text-accent">
                          {project.metric}
                        </span>
                      )}
                    </div>
                    <p className="text-12 text-text-tertiary">
                      {project.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

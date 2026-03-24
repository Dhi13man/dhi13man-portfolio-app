"use client";

import { useState, useRef, useEffect, type MutableRefObject } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { JourneyChapter } from "@/data/journey";

interface ChapterNavProps {
  chapters: JourneyChapter[];
  activeChapterRef: MutableRefObject<number>;
  onNavigate: (index: number) => void;
}

export function ChapterNav({
  chapters,
  activeChapterRef,
  onNavigate,
}: ChapterNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Poll GSAP ticker to sync displayed state with the ref (avoids setState on every scroll pixel)
  useEffect(() => {
    const callback = () => {
      if (activeChapterRef.current !== activeIndex) {
        setActiveIndex(activeChapterRef.current);
      }
    };
    gsap.ticker.add(callback);
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [activeChapterRef, activeIndex]);

  return (
    <nav
      ref={navRef}
      aria-label="Chapter navigation"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
      <div className="flex flex-col items-center gap-4">
        {chapters.map((chapter, i) => {
          const isActive = activeIndex === i;
          return (
            <div key={chapter.id} className="relative flex items-center">
              {/* Tooltip */}
              {hoveredIndex === i && (
                <span className="absolute right-8 whitespace-nowrap rounded bg-surface/90 px-3 py-1 text-12 text-text-secondary backdrop-blur-sm">
                  {chapter.navLabel}
                </span>
              )}
              <button
                type="button"
                aria-label={`Navigate to: ${chapter.navLabel}`}
                aria-current={isActive ? "step" : undefined}
                className="group relative flex items-center justify-center p-4"
                onClick={() => onNavigate(i)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Pulse ring for active dot */}
                {isActive && (
                  <span
                    className="absolute h-5 w-5 rounded-full border border-accent/30"
                    aria-hidden="true"
                  />
                )}
                {/* Dot */}
                <span
                  className={cn(
                    "relative h-3 w-3 rounded-full border transition-all duration-fast",
                    isActive
                      ? "border-accent bg-accent"
                      : "border-border bg-transparent group-hover:border-border-hover",
                  )}
                  aria-hidden="true"
                />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

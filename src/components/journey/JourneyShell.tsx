"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { chapters } from "@/data/journey";
import { ChapterNav } from "./ChapterNav";
import { HeroChapter } from "./HeroChapter";
import { FoundationChapter } from "./FoundationChapter";
import { GrowwChapter } from "./GrowwChapter";
import { VenturesChapter } from "./VenturesChapter";
import { CurrentChapter } from "./CurrentChapter";
import { CTAChapter } from "./CTAChapter";

export function JourneyShell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const activeChapterRef = useRef(0);

  // Immersive mode: hide header/footer, setup Lenis
  useEffect(() => {
    document.body.classList.add("journey-immersive");
    document.documentElement.classList.add("lenis-active");

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.1,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ticker (single rAF loop)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      document.body.classList.remove("journey-immersive");
      document.documentElement.classList.remove("lenis-active");
      // Belt-and-suspenders cleanup for any lingering ScrollTriggers
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Refresh ScrollTrigger after all chapters have mounted
  useGSAP(
    () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    { scope: containerRef },
  );

  const scrollToChapter = (index: number) => {
    const chapterId = chapters[index]?.id;
    if (!chapterId) return;
    const el = document.querySelector(`[data-chapter="${chapterId}"]`);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el as HTMLElement, { offset: 0 });
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Home link - persistent escape hatch, mirrors Header logo */}
      <Link
        href="/"
        className="fixed left-6 top-6 z-50 font-display text-20 font-bold text-text-tertiary transition-colors duration-fast hover:text-text-primary"
        aria-label="Back to portfolio home"
      >
        DS
      </Link>
      <ChapterNav
        chapters={chapters}
        activeChapterRef={activeChapterRef}
        onNavigate={scrollToChapter}
      />
      <HeroChapter activeChapterRef={activeChapterRef} />
      <FoundationChapter activeChapterRef={activeChapterRef} />
      <GrowwChapter activeChapterRef={activeChapterRef} />
      <VenturesChapter activeChapterRef={activeChapterRef} />
      <CurrentChapter activeChapterRef={activeChapterRef} />
      <CTAChapter activeChapterRef={activeChapterRef} />
    </div>
  );
}

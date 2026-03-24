"use client";

import { useRef, type MutableRefObject } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrollReveal } from "./ScrollReveal";
import { chapters, ctaNarrative, ctaLinks } from "@/data/journey";
import { Github, Linkedin, Mail, Pen, Twitter } from "lucide-react";
import Link from "next/link";

interface CTAChapterProps {
  activeChapterRef: MutableRefObject<number>;
}

export function CTAChapter({ activeChapterRef }: CTAChapterProps) {
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

  const socialLinks = [
    { href: ctaLinks.github, icon: Github, label: "GitHub" },
    { href: ctaLinks.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: ctaLinks.medium, icon: Pen, label: "Medium" },
    { href: ctaLinks.twitter, icon: Twitter, label: "Twitter" },
    { href: ctaLinks.email, icon: Mail, label: "Email" },
  ];

  return (
    <section
      ref={sectionRef}
      data-chapter={chapter.id}
      id={`chapter-${chapter.id}`}
      aria-labelledby="cta-heading"
      className="flex min-h-svh flex-col items-center justify-center bg-background px-8 py-16"
    >
      <ScrollReveal className="flex max-w-[640px] flex-col items-center gap-8 text-center">
        <span className="text-12 uppercase tracking-widest text-text-quaternary">
          {chapter.label}
        </span>

        <h2
          id="cta-heading"
          className="font-display text-32 font-bold text-text-primary"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {chapter.title}
        </h2>

        <p
          className="text-16 leading-relaxed text-text-secondary"
          style={{ textWrap: "pretty" } as React.CSSProperties}
        >
          {ctaNarrative}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={ctaLinks.email}
            className="inline-flex min-h-[48px] items-center rounded bg-accent px-6 py-3 text-16 font-medium text-text-primary transition-colors duration-fast hover:bg-accent-hover focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Let&apos;s talk
          </a>
          <Link
            href="/experience/"
            className="inline-flex min-h-[48px] items-center rounded border border-border px-6 py-3 text-16 font-medium text-text-secondary transition-all duration-fast hover:border-border-hover hover:text-text-primary"
          >
            View experience
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center rounded px-6 py-3 text-16 font-medium text-text-tertiary transition-all duration-fast hover:text-text-primary"
          >
            Explore the portfolio
          </Link>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded p-3 text-text-tertiary transition-colors duration-fast hover:text-text-primary"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="mt-8 text-14 text-text-quaternary"
          suppressHydrationWarning
        >
          &copy; {new Date().getFullYear()} Dhiman Seal. All rights reserved.
        </p>
      </ScrollReveal>
    </section>
  );
}

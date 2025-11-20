"use client";

import { Layers, GitBranch, Users, Zap, Target, Code } from "lucide-react";
import type { About, AboutValue } from "@/types/about";

interface AboutSectionProps {
  data: About;
}

const iconMap = {
  layers: Layers,
  "git-branch": GitBranch,
  users: Users,
  zap: Zap,
  target: Target,
  code: Code,
} as const;

function ValueIcon({ iconName }: { iconName: AboutValue["iconName"] }) {
  const Icon = iconMap[iconName];
  return <Icon className="w-5 h-5" />;
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <div className="space-y-12">
      {/* Headline */}
      <div className="space-y-4">
        <h3 className="text-24 font-display font-semibold text-text-primary">
          {data.headline}
        </h3>
        <p className="text-16 text-text-secondary leading-relaxed max-w-2xl">
          {data.introduction}
        </p>
      </div>

      {/* Highlights/Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.highlights.map((highlight) => (
          <div
            key={highlight.label}
            className="p-4 rounded-lg border border-border bg-surface/50 hover:border-border-hover transition-colors duration-fast"
          >
            <div className="text-32 font-display font-bold text-accent">
              {highlight.value}
            </div>
            <div className="text-12 text-text-tertiary uppercase tracking-wide mt-1">
              {highlight.label}
            </div>
          </div>
        ))}
      </div>

      {/* Expertise Areas */}
      <div className="space-y-6">
        <h4 className="text-16 font-semibold text-text-primary uppercase tracking-wide">
          Expertise
        </h4>
        <div className="space-y-4">
          {data.expertise.map((area) => (
            <div key={area.area} className="space-y-2">
              <div className="text-14 text-text-tertiary">{area.area}</div>
              <div className="flex flex-wrap gap-2">
                {area.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-12 rounded border border-border bg-surface/30 text-text-secondary hover:border-accent hover:text-accent transition-colors duration-fast"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="space-y-6">
        <h4 className="text-16 font-semibold text-text-primary uppercase tracking-wide">
          Core Principles
        </h4>
        <div className="space-y-4">
          {data.values.map((value) => (
            <div
              key={value.number}
              className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-border-hover transition-colors duration-fast"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded flex items-center justify-center bg-accent/10 text-accent">
                <ValueIcon iconName={value.iconName} />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-12 text-text-quaternary font-mono">
                    {String(value.number).padStart(2, "0")}
                  </span>
                  <h5 className="text-16 font-semibold text-text-primary">
                    {value.title}
                  </h5>
                </div>
                <p className="text-14 text-text-tertiary leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fun Facts */}
      <div className="space-y-4">
        <h4 className="text-16 font-semibold text-text-primary uppercase tracking-wide">
          Fun Facts
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.funFacts.map((funFact, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 text-14 text-text-secondary"
            >
              <span className="text-20" role="img" aria-hidden="true">
                {funFact.emoji}
              </span>
              <span>{funFact.fact}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Focus */}
      {data.currentFocus && (
        <div className="p-4 rounded-lg border-l-2 border-accent bg-accent/5">
          <div className="text-12 text-accent uppercase tracking-wide mb-2">
            Current Focus
          </div>
          <p className="text-14 text-text-secondary leading-relaxed">
            {data.currentFocus}
          </p>
        </div>
      )}
    </div>
  );
}

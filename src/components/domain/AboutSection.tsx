import type { About } from "@/types/about";
import { ValueIcon } from "./ValueIcon";
import Link from "next/link";

interface AboutSectionProps {
  data: About;
}

/**
 * AboutSection displays the headline, introduction, highlights grid, and expertise areas.
 * Designed for programmatic integration with proper null safety and accessibility.
 */
export function AboutSection({ data }: AboutSectionProps) {
  // Validate data structure
  if (!data) {
    return (
      <div role="alert" className="text-text-tertiary p-4">
        Unable to load about section
      </div>
    );
  }

  // Safely access arrays with fallbacks
  const highlights = Array.isArray(data.highlights) ? data.highlights : [];
  const expertise = Array.isArray(data.expertise) ? data.expertise : [];
  const values = Array.isArray(data.values) ? data.values : [];

  return (
    <article className="space-y-12">
      {/* Headline */}
      <header className="space-y-4">
        <h3 className="text-24 font-display font-semibold text-text-primary">
          {data.headline || "About Me"}
        </h3>
        {data.introduction && (
          <p className="text-16 text-text-secondary leading-relaxed">
            {data.introduction}
          </p>
        )}
      </header>

      {/* Highlights/Stats Grid */}
      {highlights.length > 0 ? (
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((highlight, index) => {
            const cardContent = (
              <>
                <dd className="text-32 font-display font-bold text-accent">
                  {highlight.value}
                </dd>
                <dt className="text-12 text-text-tertiary uppercase tracking-wide mt-1">
                  {highlight.label}
                </dt>
              </>
            );

            const cardClassName = "block p-4 rounded-lg border border-border bg-surface/50 hover:border-border-hover hover:bg-surface/80 transition-colors duration-fast";

            if (highlight.link) {
              const isExternal = highlight.link.startsWith('http');

              if (isExternal) {
                return (
                  <a
                    key={`highlight-${index}-${highlight.label}`}
                    href={highlight.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <Link
                  key={`highlight-${index}-${highlight.label}`}
                  href={highlight.link}
                  className={cardClassName}
                >
                  {cardContent}
                </Link>
              );
            }

            return (
              <div
                key={`highlight-${index}-${highlight.label}`}
                className="p-4 rounded-lg border border-border bg-surface/50 hover:border-border-hover transition-colors duration-fast"
              >
                {cardContent}
              </div>
            );
          })}
        </dl>
      ) : (
        <div className="text-text-tertiary text-14">
          No statistics available
        </div>
      )}

      {/* Expertise Areas - 2 column grid */}
      {expertise.length > 0 && (
        <section className="space-y-6" aria-labelledby="expertise-heading">
          <h4
            id="expertise-heading"
            className="text-16 font-semibold text-text-primary uppercase tracking-wide"
          >
            Expertise
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertise.map((area, areaIndex) => (
              <div key={`expertise-${areaIndex}-${area.area}`} className="space-y-2">
                <div className="text-14 text-text-tertiary">{area.area}</div>
                <div className="flex flex-wrap gap-2" role="list" aria-label={`${area.area} skills`}>
                  {Array.isArray(area.skills) && area.skills.map((skill, skillIndex) => (
                    <span
                      key={`skill-${areaIndex}-${skillIndex}`}
                      role="listitem"
                      className="px-3 py-1 text-12 rounded border border-border bg-surface/30 text-text-secondary hover:border-border-hover hover:text-accent transition-colors duration-fast"
                      title={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Core Principles */}
      {values.length > 0 && (
        <section className="space-y-6" aria-labelledby="principles-heading">
          <h4
            id="principles-heading"
            className="text-16 font-semibold text-text-primary uppercase tracking-wide"
          >
            Core Principles
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((value, index) => (
              <div
                key={`value-${index}-${value.number}`}
                className="p-4 rounded-lg border border-border hover:border-border-hover transition-colors duration-fast"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded flex items-center justify-center bg-accent/10 text-accent">
                    <ValueIcon iconName={value.iconName} />
                  </div>
                  <h5 className="text-14 font-semibold text-text-primary">
                    {value.title}
                  </h5>
                </div>
                <p className="text-14 text-text-tertiary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

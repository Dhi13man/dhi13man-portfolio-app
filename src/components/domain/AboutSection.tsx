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
              <div className="flex flex-col-reverse">
                <dt className="text-12 text-text-tertiary uppercase tracking-wider mt-2">
                  {highlight.label}
                </dt>
                <dd className="text-32 font-display font-bold text-accent">
                  {highlight.value}
                </dd>
              </div>
            );

            const cardClassName = "block p-5 rounded-lg border border-border bg-surface hover:border-accent/50 transition-colors duration-150";

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
                className="p-5 rounded-lg border border-border bg-surface"
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
            className="text-14 font-semibold text-text-tertiary uppercase tracking-widest"
          >
            Expertise
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {expertise.map((area, areaIndex) => (
              <div key={`expertise-${areaIndex}-${area.area}`} className="space-y-3">
                <div className="text-14 font-medium text-text-secondary">{area.area}</div>
                <div className="flex flex-wrap gap-2" role="list" aria-label={`${area.area} skills`}>
                  {Array.isArray(area.skills) && area.skills.map((skill, skillIndex) => (
                    <span
                      key={`skill-${areaIndex}-${skillIndex}`}
                      role="listitem"
                      className="px-3 py-1.5 text-12 rounded-lg border border-border bg-surface text-text-tertiary hover:border-accent/50 hover:text-accent transition-colors duration-150 cursor-default"
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
            className="text-14 font-semibold text-text-tertiary uppercase tracking-widest"
          >
            Core Principles
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {values.map((value, index) => {
              const valueContent = (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-surface border border-border text-accent">
                      <ValueIcon iconName={value.iconName} />
                    </div>
                    <h5 className="text-14 font-semibold text-text-primary">
                      {value.title}
                    </h5>
                  </div>
                  <p className="text-14 text-text-tertiary leading-relaxed pl-[52px]">
                    {value.description}
                  </p>
                </>
              );

              const valueClassName = "block p-5 rounded-lg border border-border hover:border-accent/50 transition-colors duration-150";

              if (value.link) {
                return (
                  <Link
                    key={`value-${index}-${value.number}`}
                    href={value.link}
                    className={valueClassName}
                  >
                    {valueContent}
                  </Link>
                );
              }

              return (
                <div
                  key={`value-${index}-${value.number}`}
                  className="p-5 rounded-lg border border-border"
                >
                  {valueContent}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}

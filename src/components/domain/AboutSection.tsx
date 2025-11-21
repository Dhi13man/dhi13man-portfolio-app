import type { About } from "@/types/about";

interface AboutSectionProps {
  data: About;
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <div className="space-y-12">
      {/* Headline */}
      <div className="space-y-4">
        <h3 className="text-24 font-display font-semibold text-text-primary">
          {data.headline}
        </h3>
        <p className="text-16 text-text-secondary leading-relaxed">
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

      {/* Expertise Areas - 2 column grid */}
      <div className="space-y-6">
        <h4 className="text-16 font-semibold text-text-primary uppercase tracking-wide">
          Expertise
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.expertise.map((area) => (
            <div key={area.area} className="space-y-2">
              <div className="text-14 text-text-tertiary">{area.area}</div>
              <div className="flex flex-wrap gap-2">
                {area.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-12 rounded border border-border bg-surface/30 text-text-secondary hover:border-border-hover hover:text-accent transition-colors duration-fast"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

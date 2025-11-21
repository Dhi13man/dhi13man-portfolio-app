import { Section, SectionHeader, SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/domain/ProjectCard";
import { VentureCard } from "@/components/domain/VentureCard";
import { AboutSection } from "@/components/domain/AboutSection";
import { ValueIcon } from "@/components/domain/ValueIcon";
import Image from "next/image";
import { aboutData } from "@/data/about";
import { projects } from "@/data/projects";
import { ventures } from "@/data/ventures";
import { isDatePresent } from "@/lib/date";
import {
  fetchGitHubStats,
  calculateYearsExperience,
  formatStarCount,
  formatRepoCount,
} from "@/lib/github";
import type { AboutHighlight } from "@/types/about";

export default async function Home() {
  // Get current initiatives (ongoing projects and ventures)
  const currentProjects = projects.filter((p) => isDatePresent(p.endDate));
  const currentVentures = ventures.filter((v) =>
    Array.isArray(v.roles) && v.roles.some((r) => isDatePresent(r?.endDate)),
  );

  // Fetch GitHub stats at build time
  const githubStats = await fetchGitHubStats("Dhi13man");

  // Log error if GitHub fetch failed (visible in build logs)
  if (githubStats.isError) {
    console.warn(
      `GitHub stats fetch failed: ${githubStats.errorMessage}. Using fallback display.`
    );
  }

  // Calculate dynamic highlights
  const yearsExperience = calculateYearsExperience(2019);
  const activeInitiatives = currentProjects.length + currentVentures.length;

  const highlights: AboutHighlight[] = [
    {
      value: `${yearsExperience}+`,
      label: "Years Experience",
    },
    {
      value: formatRepoCount(githubStats.publicRepos),
      label: "Open Source Packages",
    },
    {
      value: formatStarCount(githubStats.totalStars),
      label: "GitHub Stars",
    },
    {
      value: `${activeInitiatives}`,
      label: "Active Initiatives",
    },
  ];

  // Merge computed highlights with static about data
  const aboutDataWithHighlights = {
    ...aboutData,
    highlights,
  };

  return (
    <>
      {/* Hero Section - Linear style: Large display, minimal */}
      <Section noDivider className="py-16">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-border">
              <Image
                src="/assets/me.webp"
                alt="Dhiman Seal"
                fill
                className="object-cover"
                sizes="128px"
                priority
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-64 font-display font-bold text-text-primary">
              Dhiman Seal
            </h1>
            <p className="text-20 text-text-secondary font-medium">
              {aboutData.tagline}
            </p>
            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href="https://github.com/Dhi13man"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors duration-fast"
                aria-label="GitHub Profile"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/dhi13man/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors duration-fast"
                aria-label="LinkedIn Profile"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://medium.com/@dhi13man"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors duration-fast"
                aria-label="Medium Profile"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
              <a
                href="mailto:dhiman.seal@hotmail.com"
                className="text-text-secondary hover:text-text-primary transition-colors duration-fast"
                aria-label="Email"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* About Section - Enhanced with stats, skills, and values */}
      <Section>
        <SectionHeader>
          <SectionTitle>About</SectionTitle>
        </SectionHeader>
        <AboutSection data={aboutDataWithHighlights} />
      </Section>

      {/* Current Initiatives Section - using domain components for consistency and images */}
      {(currentProjects.length > 0 || currentVentures.length > 0) && (
        <Section>
          <SectionHeader>
            <SectionTitle>Current Initiatives</SectionTitle>
          </SectionHeader>

          {currentProjects.length > 0 && (
            <div className="space-y-4 mb-8">
              <h3 className="text-20 font-semibold text-text-primary">
                Active Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.name} project={project} compact />
                ))}
              </div>
            </div>
          )}

          {currentVentures.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-20 font-semibold text-text-primary">
                Active Ventures
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentVentures.map((venture) => (
                  <VentureCard key={venture.name} venture={venture} />
                ))}
              </div>
            </div>
          )}
        </Section>
      )}

      {/* Core Principles Section */}
      <Section>
        <SectionHeader>
          <SectionTitle>Core Principles</SectionTitle>
        </SectionHeader>
        <div className="space-y-4">
          {aboutData.values.map((value, index) => (
            <div
              key={`value-${index}-${value.number}`}
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
                  <h3 className="text-16 font-semibold text-text-primary">
                    {value.title}
                  </h3>
                </div>
                <p className="text-14 text-text-tertiary leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

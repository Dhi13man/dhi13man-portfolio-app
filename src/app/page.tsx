import { Section, SectionHeader, SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/domain/ProjectCard";
import { VentureCard } from "@/components/domain/VentureCard";
import { AboutSection } from "@/components/domain/AboutSection";
import { ValueIcon } from "@/components/domain/ValueIcon";
import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
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
  if (githubStats.isError && process.env.NODE_ENV === "development") {
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
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/dhi13man/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent transition-colors duration-fast"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://medium.com/@dhi13man"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-text-primary transition-colors duration-fast"
                aria-label="Medium Profile"
              >
                {/* Medium icon not available in lucide-react */}
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
                <Mail className="w-6 h-6" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aboutData.values.map((value, index) => (
            <div
              key={`value-${index}-${value.number}`}
              className="p-4 rounded-lg border border-border hover:border-border-hover transition-colors duration-fast"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded flex items-center justify-center bg-accent/10 text-accent">
                  <ValueIcon iconName={value.iconName} />
                </div>
                <h3 className="text-14 font-semibold text-text-primary">
                  {value.title}
                </h3>
              </div>
              <p className="text-14 text-text-tertiary leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

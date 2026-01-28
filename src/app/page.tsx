import { Section, SectionHeader, SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/domain/ProjectCard";
import { VentureCard } from "@/components/domain/VentureCard";
import { AboutSection } from "@/components/domain/AboutSection";
import ExportedImage from "next-image-export-optimizer";
import { Github, Linkedin, Mail } from "lucide-react";
import { aboutData } from "@/data/about";
import { projects } from "@/data/projects";
import { ventures } from "@/data/ventures";
import { experiences } from "@/data/experiences";
import { isDatePresent, parseStartDate } from "@/lib/date";
import {
  fetchGitHubStats,
  calculateYearsExperience,
  formatStarCount,
  formatRepoCount,
} from "@/lib/github";
import { findEarliestWorkExperience } from "@/lib/experience";
import type { AboutHighlight } from "@/types/about";

// Maximum number of initiatives to display per category
const MAX_INITIATIVES_PER_CATEGORY = 4;

export default async function Home() {
  // Get current initiatives (ongoing projects and ventures)
  // Filter for active, sort by descending start date, limit to max 4
  const currentProjects = projects
    .filter((p) => isDatePresent(p.endDate))
    .sort((a, b) => parseStartDate(b.startDate).getTime() - parseStartDate(a.startDate).getTime())
    .slice(0, MAX_INITIATIVES_PER_CATEGORY);

  const currentVentures = ventures
    .filter((v) =>
      Array.isArray(v.roles) && v.roles.some((r) => isDatePresent(r?.endDate)),
    )
    .sort((a, b) => {
      // Get the start date of the most recent active role for sorting
      const getActiveRoleStartDate = (venture: typeof a) => {
        const activeRole = venture.roles.find((r) => isDatePresent(r?.endDate));
        return activeRole ? parseStartDate(activeRole.startDate) : new Date(0);
      };
      return getActiveRoleStartDate(b).getTime() - getActiveRoleStartDate(a).getTime();
    })
    .slice(0, MAX_INITIATIVES_PER_CATEGORY);

  // Fetch GitHub stats at build time
  const githubStats = await fetchGitHubStats("Dhi13man");

  // Log error if GitHub fetch failed (visible in build logs)
  if (githubStats.isError && process.env.NODE_ENV === "development") {
    console.warn(
      `GitHub stats fetch failed: ${githubStats.errorMessage}. Using fallback display.`
    );
  }

  // Calculate dynamic highlights
  // Find the earliest work experience start date to calculate years of experience
  const earliestWorkExperience = findEarliestWorkExperience(experiences);
  const yearsExperience = calculateYearsExperience(earliestWorkExperience.getFullYear());
  const activeInitiatives = currentProjects.length + currentVentures.length;

  const highlights: AboutHighlight[] = [
    {
      value: `${yearsExperience}+`,
      label: "Years Experience",
      link: "/experience",
    },
    {
      value: formatRepoCount(githubStats.publicRepos),
      label: "Open Source Packages",
      link: "/projects",
    },
    {
      value: formatStarCount(githubStats.totalStars),
      label: "GitHub Stars",
      link: "https://github.com/Dhi13man",
    },
    {
      value: `${activeInitiatives}`,
      label: "Active Initiatives",
      link: "#current-initiatives",
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
              <ExportedImage
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
        <Section id="current-initiatives">
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
    </>
  );
}

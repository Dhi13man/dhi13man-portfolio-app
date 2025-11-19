import { Section, SectionHeader, SectionTitle } from "@/components/ui/section";
import { ProjectCard } from "@/components/domain/ProjectCard";
import { VentureCard } from "@/components/domain/VentureCard";
import Image from "next/image";
import { Github, Linkedin } from "lucide-react";
import { aboutData } from "@/data/about";
import { projects } from "@/data/projects";
import { ventures } from "@/data/ventures";
import { isDatePresent } from "@/lib/date";

export default function Home() {
  // Get current initiatives (ongoing projects and ventures)
  const currentProjects = projects.filter((p) => isDatePresent(p.endDate));
  const currentVentures = ventures.filter((v) =>
    v.roles.some((r) => isDatePresent(r.endDate)),
  );

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
                className="text-text-tertiary hover:text-accent transition-colors duration-fast"
                aria-label="GitHub Profile"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/dhi13man/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-accent transition-colors duration-fast"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://medium.com/@dhi13man"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-accent transition-colors duration-fast"
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
            </div>
          </div>
        </div>
      </Section>

      {/* About Section - Linear style: Flat, single column */}
      <Section>
        <SectionHeader>
          <SectionTitle>About</SectionTitle>
        </SectionHeader>
        <div className="space-y-4 text-16 text-text-secondary leading-relaxed">
          {aboutData.description.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
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
    </>
  );
}

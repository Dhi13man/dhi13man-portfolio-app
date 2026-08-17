import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
import { ProjectCard } from "@/components/domain/ProjectCard";
import { projects } from "@/data/projects";
import { PAGE_SEO } from "@/lib/seo";

export const metadata = PAGE_SEO.projects.metadata;

export default function ProjectsPage() {
  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle as="h1">Projects</SectionTitle>
        <SectionDescription>
          A collection of open-source projects and technical work spanning
          various domains and technologies.
        </SectionDescription>
      </SectionHeader>

      <div className="space-y-3 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} headingLevel={2} />
        ))}
      </div>
    </Section>
  );
}

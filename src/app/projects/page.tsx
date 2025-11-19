import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section'
import { ProjectCard } from '@/components/domain/ProjectCard'
import { projects } from '@/data/projects'

export const metadata = {
  title: 'Projects - Dhiman Seal',
  description: 'Explore my portfolio of open-source projects and technical work.',
}

export default function ProjectsPage() {
  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle>Projects</SectionTitle>
        <SectionDescription>
          A collection of open-source projects and technical work spanning various domains and
          technologies.
        </SectionDescription>
      </SectionHeader>

      <div className="space-y-3 mt-8">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  )
}

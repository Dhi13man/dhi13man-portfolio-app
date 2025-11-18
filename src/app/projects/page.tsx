import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { ProjectCard } from '@/components/domain/ProjectCard'
import { projects } from '@/data/projects'

export const metadata = {
  title: 'Projects - Dhiman Seal',
  description: 'Explore my portfolio of open-source projects and technical work.',
}

export default function ProjectsPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground">
              A collection of open-source projects and technical work spanning various domains and technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

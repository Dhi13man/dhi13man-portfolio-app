import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { ProjectCard } from '@/components/domain/ProjectCard'
import { aboutData } from '@/data/about'
import { projects } from '@/data/projects'
import { ventures } from '@/data/ventures'
import { isDatePresent } from '@/lib/date'

export default function Home() {
  // Get current initiatives (ongoing projects and ventures)
  const currentProjects = projects.filter((p) => isDatePresent(p.endDate))
  const currentVentures = ventures.filter((v) =>
    v.roles.some((r) => isDatePresent(r.endDate))
  )

  return (
    <>
      {/* Hero Section */}
      <Section spacing="lg" className="bg-gradient-to-b from-background to-muted/20">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Dhiman Seal
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              {aboutData.tagline}
            </p>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full" />
          </div>
        </Container>
      </Section>

      {/* About Section */}
      <Section spacing="lg">
        <Container size="lg">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed">
              {aboutData.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Current Initiatives Section */}
      {(currentProjects.length > 0 || currentVentures.length > 0) && (
        <Section spacing="lg" className="bg-muted/30">
          <Container>
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                  Current Initiatives
                </h2>
              </div>

              {currentProjects.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Active Projects</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProjects.map((project) => (
                      <ProjectCard key={project.name} project={project} />
                    ))}
                  </div>
                </div>
              )}

              {currentVentures.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold">Active Ventures</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentVentures.map((venture) => (
                      <div
                        key={venture.name}
                        className="p-6 rounded-2xl bg-card border border-border hover:border-ventures transition-colors"
                      >
                        <h4 className="text-xl font-semibold mb-2">{venture.name}</h4>
                        <p className="text-muted-foreground text-sm">{venture.about}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}
    </>
  )
}

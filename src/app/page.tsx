import { Section, SectionHeader, SectionTitle } from '@/components/ui/section'
import { ProjectCard } from '@/components/domain/ProjectCard'
import { VentureCard } from '@/components/domain/VentureCard'
import Image from 'next/image'
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
          </div>
        </div>
      </Section>

      {/* About Section - Linear style: Flat, single column */}
      <Section>
        <SectionHeader>
          <SectionTitle>About</SectionTitle>
        </SectionHeader>
        <div className="space-y-4 text-16 text-text-secondary leading-relaxed">
          {aboutData.description.split('\n').map((paragraph, index) => (
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
              <h3 className="text-20 font-semibold text-text-primary">Active Projects</h3>
              <div className="space-y-3">
                {currentProjects.map((project) => (
                  <ProjectCard key={project.name} project={project} compact />
                ))}
              </div>
            </div>
          )}

          {currentVentures.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-20 font-semibold text-text-primary">Active Ventures</h3>
              <div className="space-y-3">
                {currentVentures.map((venture) => (
                  <VentureCard key={venture.name} venture={venture} />
                ))}
              </div>
            </div>
          )}
        </Section>
      )}
    </>
  )
}

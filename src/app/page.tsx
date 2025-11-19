import { Section, SectionHeader, SectionTitle } from '@/components/ui/section'
import { Panel } from '@/components/ui/panel'
import Link from 'next/link'
import Image from 'next/image'
import { aboutData } from '@/data/about'
import { projects } from '@/data/projects'
import { ventures } from '@/data/ventures'
import { isDatePresent } from '@/lib/date'
import { ExternalLink } from 'lucide-react'

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
        <div className="max-w-3xl mx-auto">
          <SectionHeader>
            <SectionTitle>About</SectionTitle>
          </SectionHeader>
          <div className="space-y-4 text-16 text-text-secondary leading-relaxed">
            {aboutData.description.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* Current Initiatives Section - Linear style: Flat list */}
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
                  <Panel key={project.name} hoverable>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-16 font-semibold text-text-primary mb-1">
                          {project.name}
                        </h4>
                        <p className="text-14 text-text-secondary line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                      {project.links?.primary && (
                        <Link
                          href={project.links.primary}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-accent hover:text-accent-hover transition-colors duration-fast"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          )}

          {currentVentures.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-20 font-semibold text-text-primary">Active Ventures</h3>
              <div className="space-y-3">
                {currentVentures.map((venture) => (
                  <Panel key={venture.name} hoverable>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-16 font-semibold text-text-primary mb-1">
                          {venture.name}
                        </h4>
                        <p className="text-14 text-text-secondary line-clamp-2">
                          {venture.about}
                        </p>
                      </div>
                      {venture.links?.primary && (
                        <Link
                          href={venture.links.primary}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-accent hover:text-accent-hover transition-colors duration-fast"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </Panel>
                ))}
              </div>
            </div>
          )}
        </Section>
      )}
    </>
  )
}

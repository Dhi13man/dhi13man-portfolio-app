import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section'
import { Panel } from '@/components/ui/panel'
import { Button } from '@/components/ui/button'
import { ImageGallery } from '@/components/ui/image-gallery'
import Link from 'next/link'
import { projects } from '@/data/projects'
import { formatDateRange } from '@/lib/date'
import { ExternalLink } from 'lucide-react'

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
        {projects.map((project) => {
          // Gather all images (primary + others)
          const allImages = project.images
            ? [project.images.primary, ...(project.images.others || [])].filter(Boolean) as string[]
            : []

          return (
            <Panel key={project.name} hoverable>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Project images */}
                {allImages.length > 0 && (
                  <ImageGallery
                    images={allImages}
                    alt={project.name}
                    thumbnailSize="md"
                    className="shrink-0"
                  />
                )}

                {/* Project details */}
                <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-20 font-semibold text-text-primary">{project.name}</h3>
                    <time className="text-12 font-mono text-text-quaternary">
                      {formatDateRange(project.startDate, project.endDate)}
                    </time>
                  </div>
                  {project.links?.primary && (
                    <Button asChild variant="ghost" size="sm" className="shrink-0">
                      <Link
                        href={project.links.primary}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </div>

                <p className="text-14 text-text-secondary">{project.description}</p>

                {project.details && project.details.length > 0 && (
                  <ul className="space-y-1 mt-2">
                    {project.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-12 text-text-tertiary"
                      >
                        <span className="text-accent font-bold shrink-0 mt-0.5">→</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Panel>
          )
        })}
      </div>
    </Section>
  )
}

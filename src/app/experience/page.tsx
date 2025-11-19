import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section'
import {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineMeta,
  TimelineDate,
  TimelineLocation,
  TimelineContent,
  TimelineDescription,
} from '@/components/ui/timeline'
import { Button } from '@/components/ui/button'
import { ImageGallery } from '@/components/ui/image-gallery'
import Link from 'next/link'
import { experiences } from '@/data/experiences'
import { formatDateRange } from '@/lib/date'
import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Experience - Dhiman Seal',
  description: 'Explore my professional journey and work experience across various companies and roles.',
}

export default function ExperiencePage() {
  // Flatten all roles with company info for timeline
  const allRoles = experiences.flatMap((experience) =>
    experience.roles.map((role, roleIndex) => {
      // Gather all images (primary + others)
      const allImages = experience.images
        ? [experience.images.primary, ...(experience.images.others || [])].filter(Boolean) as string[]
        : []

      return {
        ...role,
        companyName: experience.name,
        companyAbout: experience.about,
        companyImages: allImages,
        companyLink: experience.links?.primary,
        isLastRole: roleIndex === experience.roles.length - 1,
      }
    })
  )

  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle>Experience</SectionTitle>
        <SectionDescription>
          A journey through my professional career, showcasing the companies I&apos;ve worked with
          and the impact I&apos;ve made.
        </SectionDescription>
      </SectionHeader>

      <Timeline className="mt-8">
        {allRoles.map((role, index) => {
          const isLast = index === allRoles.length - 1

          return (
            <TimelineItem key={`${role.companyName}-${role.title}-${index}`} isLast={isLast}>
              {/* Company header (only show on first role for each company) */}
              {(index === 0 || role.companyName !== allRoles[index - 1].companyName) && (
                <div className="mb-3">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-20 font-semibold text-text-primary">
                            {role.companyName}
                          </h3>
                          <p className="text-14 text-text-tertiary mt-1">{role.companyAbout}</p>
                        </div>
                        {role.companyLink && (
                          <Button asChild variant="ghost" size="sm">
                            <Link href={role.companyLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {role.companyImages.length > 0 && (
                    <ImageGallery
                      images={role.companyImages}
                      alt={role.companyName}
                      thumbnailSize="lg"
                    />
                  )}
                </div>
              )}

              {/* Role details */}
              <TimelineHeader>
                <TimelineTitle>{role.title}</TimelineTitle>
                <TimelineMeta>
                  <TimelineDate>{formatDateRange(role.startDate, role.endDate)}</TimelineDate>
                  {role.location && <TimelineLocation>{role.location}</TimelineLocation>}
                </TimelineMeta>
              </TimelineHeader>

              <TimelineContent>
                <TimelineDescription>{role.description}</TimelineDescription>

                {role.details && role.details.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {role.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start gap-2 text-14 text-text-secondary"
                      >
                        <span className="text-accent font-bold shrink-0 mt-0.5">→</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </TimelineContent>
            </TimelineItem>
          )
        })}
      </Timeline>
    </Section>
  )
}

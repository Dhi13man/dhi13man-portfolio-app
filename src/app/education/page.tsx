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
import Link from 'next/link'
import Image from 'next/image'
import { education } from '@/data/education'
import { formatDateRange } from '@/lib/date'
import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Education - Dhiman Seal',
  description: 'Explore my educational background, academic achievements, and the institutions that shaped my learning journey.',
}

export default function EducationPage() {
  // Flatten all courses with institution info for timeline
  const allCourses = education.flatMap((edu) =>
    edu.courses.map((course, courseIndex) => ({
      ...course,
      institutionName: edu.name,
      institutionAbout: edu.about,
      institutionImage: edu.images?.primary,
      institutionLink: edu.links?.primary,
      isLastCourse: courseIndex === edu.courses.length - 1,
    }))
  )

  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle>Education</SectionTitle>
        <SectionDescription>
          My academic journey through premier institutions, from early education to advanced technical
          training.
        </SectionDescription>
      </SectionHeader>

      <Timeline className="mt-8">
        {allCourses.map((course, index) => {
          const isLast = index === allCourses.length - 1

          return (
            <TimelineItem key={`${course.institutionName}-${course.degree}-${index}`} isLast={isLast}>
              {/* Institution header (only show on first course for each institution) */}
              {(index === 0 || course.institutionName !== allCourses[index - 1].institutionName) && (
                <div className="mb-3 flex items-start gap-3">
                  {course.institutionImage && (
                    <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden border border-border bg-surface">
                      <Image
                        src={course.institutionImage}
                        alt={`${course.institutionName} logo`}
                        fill
                        className="object-contain p-1"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="text-20 font-semibold text-text-primary">
                          {course.institutionName}
                        </h3>
                        <p className="text-14 text-text-tertiary mt-1">{course.institutionAbout}</p>
                      </div>
                      {course.institutionLink && (
                        <Button asChild variant="ghost" size="sm">
                          <Link href={course.institutionLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Course details */}
              <TimelineHeader>
                <TimelineTitle>
                  {course.degree} {course.field && `in ${course.field}`}
                </TimelineTitle>
                <TimelineMeta>
                  <TimelineDate>{formatDateRange(course.startDate, course.endDate)}</TimelineDate>
                  {(course.gpa || course.percentage) && (
                    <TimelineLocation>
                      {course.gpa && `GPA: ${course.gpa}`}
                      {course.percentage && `${course.percentage}%`}
                    </TimelineLocation>
                  )}
                </TimelineMeta>
              </TimelineHeader>

              <TimelineContent>
                <TimelineDescription>{course.description}</TimelineDescription>

                {course.details && course.details.length > 0 && (
                  <ul className="space-y-2 mt-2">
                    {course.details.map((detail, detailIndex) => (
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

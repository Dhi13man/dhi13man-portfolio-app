import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import type { Education } from '@/types'
import { formatDateRange } from '@/lib/date'

interface EducationCardProps {
  education: Education
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <Card hoverable accentColor="education">
      {education.images?.primary && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={education.images.primary}
            alt={`${education.name} banner`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle>{education.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{education.about}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {education.courses.map((course, index) => (
          <div key={index} className="space-y-3">
            <div>
              <h4 className="font-semibold text-lg">
                {course.degree}
                {course.field && ` - ${course.field}`}
              </h4>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <time className="text-sm text-muted-foreground">
                  {formatDateRange(course.startDate, course.endDate)}
                </time>
                {course.gpa && (
                  <Badge variant="education" size="sm">
                    GPA: {course.gpa}
                  </Badge>
                )}
                {course.percentage && (
                  <Badge variant="education" size="sm">
                    {course.percentage}
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {course.description}
            </p>

            {course.details && course.details.length > 0 && (
              <ul className="space-y-2">
                {course.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-education font-bold mt-0.5 shrink-0">→</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}

            {index < education.courses.length - 1 && (
              <div className="border-t border-border pt-3" />
            )}
          </div>
        ))}
      </CardContent>

      {education.links?.primary && (
        <CardFooter>
          <Button asChild size="sm">
            <Link href={education.links.primary} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Institution
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import type { Experience } from '@/types'
import { formatDateRange } from '@/lib/date'

interface ExperienceCardProps {
  experience: Experience
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card hoverable accentColor="experience">
      {experience.images?.primary && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={`/${experience.images.primary}`}
            alt={`${experience.name} logo`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle>{experience.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{experience.about}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {experience.roles.map((role, index) => (
          <div key={index} className="space-y-3">
            <div>
              <h4 className="font-semibold text-lg">{role.title}</h4>
              <div className="flex flex-col gap-1 mt-1">
                <time className="text-sm text-muted-foreground">
                  {formatDateRange(role.startDate, role.endDate)}
                </time>
                {role.location && (
                  <span className="text-sm text-muted-foreground">{role.location}</span>
                )}
              </div>
            </div>

            <p className="text-base leading-relaxed text-muted-foreground">
              {role.description}
            </p>

            {role.details && role.details.length > 0 && (
              <ul className="space-y-2">
                {role.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <span className="text-experience font-bold mt-0.5 shrink-0">→</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            )}

            {index < experience.roles.length - 1 && (
              <div className="border-t border-border pt-3" />
            )}
          </div>
        ))}
      </CardContent>

      {experience.links?.primary && (
        <CardFooter>
          <Button asChild size="sm">
            <Link href={experience.links.primary} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Company
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

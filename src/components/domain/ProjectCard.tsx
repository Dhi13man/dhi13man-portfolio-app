import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types'
import { formatDateRange } from '@/lib/date'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const githubLink = project.links?.others?.find((link) => link.includes('github'))

  return (
    <Card hoverable accentColor="projects">
      {project.images?.primary && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={project.images.primary}
            alt={`${project.name} screenshot`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <time className="text-sm text-muted-foreground">
          {formatDateRange(project.startDate, project.endDate)}
        </time>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.details && project.details.length > 0 && (
          <ul className="space-y-2">
            {project.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-projects font-bold mt-0.5 shrink-0">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-4">
        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="outline" size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 flex-wrap">
          {project.links?.primary && (
            <Button asChild size="sm">
              <Link href={project.links.primary} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Project
              </Link>
            </Button>
          )}
          {githubLink && (
            <Button asChild size="sm" variant="secondary">
              <Link href={githubLink} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

import * as React from "react";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ui/image-gallery";
import Link from "next/link";
import { formatDateRange } from "@/lib/date";
import { getLinkType, getLinkLabel, LinkIcon } from "@/lib/link-utils";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";

export interface ProjectCardProps {
  project: Project;
  /**
   * Compact mode for home page - shows less detail
   */
  compact?: boolean;
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  // Gather all images (primary + others)
  const allImages = project.images
    ? ([project.images.primary, ...(project.images.others || [])].filter(
        Boolean,
      ) as string[])
    : [];

  return (
    <Panel hoverable>
      {/* Project images - always above content */}
      {allImages.length > 0 && (
        <div className="mb-3">
          <ImageGallery
            images={allImages}
            alt={project.name}
            thumbnailSize="lg"
          />
        </div>
      )}

      {/* Project details */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3
              className={
                compact
                  ? "text-16 font-semibold text-text-primary"
                  : "text-20 font-semibold text-text-primary"
              }
            >
              {project.name}
            </h3>
            <time className="text-12 font-mono text-accent/60">
              {formatDateRange(project.startDate, project.endDate)}
            </time>
          </div>
          {(project.links?.primary ||
            (project.links?.others && project.links.others.length > 0)) && (
            <div className="flex items-center gap-1 shrink-0">
              {project.links?.primary && (
                <Button asChild variant="ghost" size="sm">
                  <Link
                    href={project.links.primary}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              )}
              {project.links?.others?.map((link, linkIndex) => {
                const linkType = getLinkType(link);
                return (
                  <Link
                    key={linkIndex}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-text-tertiary hover:text-accent transition-colors duration-150"
                    aria-label={getLinkLabel(linkType)}
                  >
                    <LinkIcon type={linkType} />
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <p className="text-14 text-text-secondary">{project.description}</p>

        {!compact && project.details && project.details.length > 0 && (
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
    </Panel>
  );
}

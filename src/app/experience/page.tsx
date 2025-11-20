import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@/components/ui/section";
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
} from "@/components/ui/timeline";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/ui/image-gallery";
import Link from "next/link";
import { experiences } from "@/data/experiences";
import { formatDateRange } from "@/lib/date";
import { getLinkType, getLinkLabel, LinkIcon } from "@/lib/link-utils";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Experience - Dhiman Seal",
  description:
    "Explore my professional journey and work experience across various companies and roles.",
};

export default function ExperiencePage() {
  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle>Experience</SectionTitle>
        <SectionDescription>
          A journey through my professional career, showcasing the companies
          I&apos;ve worked with and the impact I&apos;ve made.
        </SectionDescription>
      </SectionHeader>

      <Timeline className="mt-8">
        {experiences.map((experience, expIndex) => {
          const isLastExperience = expIndex === experiences.length - 1;

          // Gather all images (primary + others)
          const allImages = experience.images
            ? ([
                experience.images.primary,
                ...(experience.images.others || []),
              ].filter(Boolean) as string[])
            : [];

          // Calculate total tenure at company
          const firstRole = experience.roles[0];
          const lastRole = experience.roles[experience.roles.length - 1];
          const totalTenure = formatDateRange(
            lastRole.startDate,
            firstRole.endDate,
          );

          return (
            <TimelineItem
              key={`${experience.name}-${expIndex}`}
              isLast={isLastExperience}
            >
              {/* Company Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-20 font-semibold text-text-primary">
                      {experience.name}
                    </h3>
                    <p className="text-12 font-mono text-text-quaternary mt-1">
                      {totalTenure}
                    </p>
                    <p className="text-14 text-text-tertiary mt-1">
                      {experience.about}
                    </p>
                  </div>
                  {(experience.links?.primary ||
                    (experience.links?.others &&
                      experience.links.others.length > 0)) && (
                    <div className="flex items-center gap-1 shrink-0">
                      {experience.links?.primary && (
                        <Button asChild variant="ghost" size="sm">
                          <Link
                            href={experience.links.primary}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      {experience.links?.others?.map((link, linkIndex) => {
                        const linkType = getLinkType(link);
                        return (
                          <Link
                            key={linkIndex}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-text-tertiary hover:text-accent transition-colors duration-fast"
                            aria-label={getLinkLabel(linkType)}
                          >
                            <LinkIcon type={linkType} />
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
                {allImages.length > 0 && (
                  <ImageGallery
                    images={allImages}
                    alt={experience.name}
                    thumbnailSize="lg"
                  />
                )}
              </div>

              {/* Roles under this company */}
              <div className="space-y-6 border-l-2 border-border pl-4 ml-1">
                {experience.roles.map((role, roleIndex) => (
                  <div key={`${experience.name}-${role.title}-${roleIndex}`}>
                    {/* Role Header */}
                    <TimelineHeader>
                      <TimelineTitle>{role.title}</TimelineTitle>
                      <TimelineMeta>
                        <TimelineDate>
                          {formatDateRange(role.startDate, role.endDate)}
                        </TimelineDate>
                        {role.location && (
                          <TimelineLocation>{role.location}</TimelineLocation>
                        )}
                      </TimelineMeta>
                    </TimelineHeader>

                    {/* Role Content */}
                    <TimelineContent>
                      <TimelineDescription>
                        {role.description}
                      </TimelineDescription>

                      {role.details && role.details.length > 0 && (
                        <ul className="space-y-2 mt-2">
                          {role.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-start gap-2 text-14 text-text-secondary"
                            >
                              <span className="text-accent font-bold shrink-0 mt-0.5">
                                →
                              </span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </TimelineContent>
                  </div>
                ))}
              </div>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}

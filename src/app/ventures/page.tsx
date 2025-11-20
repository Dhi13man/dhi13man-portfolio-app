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
import { ventures } from "@/data/ventures";
import { formatDateRange } from "@/lib/date";
import { getLinkType, getLinkLabel, LinkIcon } from "@/lib/link-utils";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Ventures - Dhiman Seal",
  description:
    "Explore my entrepreneurial journey through various startups and ventures I have founded and contributed to.",
};

export default function VenturesPage() {
  // Flatten all roles with venture info for timeline
  const allRoles = ventures.flatMap((venture) =>
    venture.roles.map((role, roleIndex) => {
      // Gather all images (primary + others)
      const allImages = venture.images
        ? ([venture.images.primary, ...(venture.images.others || [])].filter(
            Boolean,
          ) as string[])
        : [];

      return {
        ...role,
        ventureName: venture.name,
        ventureAbout: venture.about,
        ventureImages: allImages,
        ventureLink: venture.links?.primary,
        ventureOtherLinks: venture.links?.others,
        isLastRole: roleIndex === venture.roles.length - 1,
      };
    }),
  );

  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle>Ventures</SectionTitle>
        <SectionDescription>
          My entrepreneurial journey through founding and leading various
          startups and innovative ventures.
        </SectionDescription>
      </SectionHeader>

      <Timeline className="mt-8">
        {allRoles.map((role, index) => {
          const isLast = index === allRoles.length - 1;

          return (
            <TimelineItem
              key={`${role.ventureName}-${role.title}-${index}`}
              isLast={isLast}
            >
              {/* Venture header (only show on first role for each venture) */}
              {(index === 0 ||
                role.ventureName !== allRoles[index - 1].ventureName) && (
                <div className="mb-3">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="text-20 font-semibold text-text-primary">
                            {role.ventureName}
                          </h3>
                          <p className="text-14 text-text-tertiary mt-1">
                            {role.ventureAbout}
                          </p>
                        </div>
                        {(role.ventureLink ||
                          (role.ventureOtherLinks &&
                            role.ventureOtherLinks.length > 0)) && (
                          <div className="flex items-center gap-1 shrink-0">
                            {role.ventureLink && (
                              <Button asChild variant="ghost" size="sm">
                                <Link
                                  href={role.ventureLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </Link>
                              </Button>
                            )}
                            {role.ventureOtherLinks?.map((link, linkIndex) => {
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
                    </div>
                  </div>
                  {role.ventureImages.length > 0 && (
                    <ImageGallery
                      images={role.ventureImages}
                      alt={role.ventureName}
                      thumbnailSize="lg"
                    />
                  )}
                </div>
              )}

              {/* Role details */}
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

              <TimelineContent>
                <TimelineDescription>{role.description}</TimelineDescription>

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
            </TimelineItem>
          );
        })}
      </Timeline>
    </Section>
  );
}

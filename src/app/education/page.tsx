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
import { education } from "@/data/education";
import { formatDateRange } from "@/lib/date";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Education - Dhiman Seal",
  description:
    "Explore my educational background, academic achievements, and the institutions that shaped my learning journey.",
};

export default function EducationPage() {
  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle>Education</SectionTitle>
        <SectionDescription>
          My academic journey through premier institutions, from early education
          to advanced technical training.
        </SectionDescription>
      </SectionHeader>

      <Timeline className="mt-8">
        {education.map((edu, eduIndex) => {
          const isLastEducation = eduIndex === education.length - 1;

          // Gather all images (primary + others)
          const allImages = edu.images
            ? ([edu.images.primary, ...(edu.images.others || [])].filter(
                Boolean,
              ) as string[])
            : [];

          // Calculate total time at institution
          const firstCourse = edu.courses[0];
          const lastCourse = edu.courses[edu.courses.length - 1];
          const totalTime = formatDateRange(
            lastCourse.startDate,
            firstCourse.endDate,
          );

          return (
            <TimelineItem
              key={`${edu.name}-${eduIndex}`}
              isLast={isLastEducation}
            >
              {/* Institution Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-20 font-semibold text-text-primary">
                      {edu.name}
                    </h3>
                    <p className="text-12 font-mono text-text-quaternary mt-1">
                      {totalTime}
                    </p>
                    <p className="text-14 text-text-tertiary mt-1">
                      {edu.about}
                    </p>
                  </div>
                  {edu.links?.primary && (
                    <Button asChild variant="ghost" size="sm">
                      <Link
                        href={edu.links.primary}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </div>
                {allImages.length > 0 && (
                  <ImageGallery
                    images={allImages}
                    alt={edu.name}
                    thumbnailSize="lg"
                  />
                )}
              </div>

              {/* Courses under this institution */}
              <div className="space-y-6 border-l-2 border-border pl-4 ml-1">
                {edu.courses.map((course, courseIndex) => (
                  <div key={`${edu.name}-${course.degree}-${courseIndex}`}>
                    {/* Course Header */}
                    <TimelineHeader>
                      <TimelineTitle>
                        {course.degree} {course.field && `in ${course.field}`}
                      </TimelineTitle>
                      <TimelineMeta>
                        <TimelineDate>
                          {formatDateRange(course.startDate, course.endDate)}
                        </TimelineDate>
                        {(course.gpa || course.percentage) && (
                          <TimelineLocation>
                            {course.gpa && `GPA: ${course.gpa}`}
                            {course.percentage && `${course.percentage}%`}
                          </TimelineLocation>
                        )}
                      </TimelineMeta>
                    </TimelineHeader>

                    {/* Course Content */}
                    <TimelineContent>
                      <TimelineDescription>
                        {course.description}
                      </TimelineDescription>

                      {course.details && course.details.length > 0 && (
                        <ul className="space-y-2 mt-2">
                          {course.details.map((detail, detailIndex) => (
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

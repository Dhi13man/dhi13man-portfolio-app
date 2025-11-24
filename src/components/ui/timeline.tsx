import * as React from "react";
import { cn } from "@/lib/utils";

const Timeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("relative space-y-6", className)} {...props} />
  );
});
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isLast?: boolean;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, isLast = false, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative pl-8", className)} {...props}>
        {/* Timeline line */}
        {!isLast && (
          <div className="absolute left-[7px] top-[16px] bottom-[-24px] w-[2px] bg-border" />
        )}

        {/* Timeline dot */}
        <div className="absolute left-0 top-[6px] w-4 h-4 rounded-full border-2 border-accent bg-background" />

        {/* Content */}
        <div className="pb-8">{children}</div>
      </div>
    );
  },
);
TimelineItem.displayName = "TimelineItem";

const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-1 mb-2", className)} {...props} />
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-20 font-semibold text-text-primary", className)}
    {...props}
  />
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineMeta = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1", className)} {...props} />
));
TimelineMeta.displayName = "TimelineMeta";

const TimelineDate = React.forwardRef<
  HTMLTimeElement,
  React.TimeHTMLAttributes<HTMLTimeElement>
>(({ className, ...props }, ref) => (
  <time
    ref={ref}
    className={cn("text-12 font-mono text-text-quaternary", className)}
    {...props}
  />
));
TimelineDate.displayName = "TimelineDate";

const TimelineLocation = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("text-12 text-text-tertiary", className)}
    {...props}
  />
));
TimelineLocation.displayName = "TimelineLocation";

const TimelineContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
TimelineContent.displayName = "TimelineContent";

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-14 text-text-secondary leading-relaxed", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";

export {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineMeta,
  TimelineDate,
  TimelineLocation,
  TimelineContent,
  TimelineDescription,
};

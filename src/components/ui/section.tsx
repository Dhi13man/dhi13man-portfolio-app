import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  noDivider?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, noDivider = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "w-full py-16 relative",
          !noDivider && "border-t border-border/50",
          className,
        )}
        {...props}
      >
        {!noDivider && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
        )}
        <div className="max-w-[1200px] mx-auto px-8">{children}</div>
      </section>
    );
  },
);
Section.displayName = "Section";

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2 mb-8", className)} {...props} />
));
SectionHeader.displayName = "SectionHeader";

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-32 font-display font-bold text-text-primary tracking-tight",
      className,
    )}
    {...props}
  />
));
SectionTitle.displayName = "SectionTitle";

const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-16 text-text-tertiary max-w-2xl", className)}
    {...props}
  />
));
SectionDescription.displayName = "SectionDescription";

export { Section, SectionHeader, SectionTitle, SectionDescription };

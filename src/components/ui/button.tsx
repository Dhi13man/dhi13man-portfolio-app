import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-accent text-background font-semibold hover:bg-accent-hover hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] active:scale-[0.98]",
      secondary:
        "border border-accent/30 text-accent hover:border-accent hover:bg-accent-muted active:scale-[0.98]",
      ghost: "text-text-secondary hover:text-accent hover:bg-accent-muted/50 active:scale-[0.98]",
      link: "text-accent hover:text-accent-hover underline-offset-4 hover:underline",
    };

    const sizes = {
      sm: "h-8 px-3 text-12",
      md: "h-10 px-4 text-14",
      lg: "h-12 px-6 text-16",
    };

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button };

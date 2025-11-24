"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "About", href: "/" },
  { name: "Ventures", href: "/ventures/" },
  { name: "Experience", href: "/experience/" },
  { name: "Projects", href: "/projects/" },
  { name: "Achievements", href: "/achievements/" },
  { name: "Recommendations", href: "/recommendations/" },
  { name: "Education", href: "/education/" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="max-w-[1200px] mx-auto px-8">
        <nav
          className="flex items-center justify-between py-4"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-20 font-bold text-text-primary hover:text-accent transition-all duration-150 hover:scale-105"
            aria-label="Dhiman Seal - Home"
          >
            <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">DS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "px-3 py-2 rounded-lg text-14 font-medium transition-all duration-150 relative",
                    isActive
                      ? "text-accent bg-accent-muted"
                      : "text-text-tertiary hover:text-accent hover:bg-accent-muted/50",
                  )}
                >
                  {item.name}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-accent shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-text-tertiary hover:text-text-primary transition-colors duration-fast"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden pb-4 border-t border-accent/20 mt-4 pt-4"
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "px-4 py-3 rounded-lg text-14 font-medium transition-all duration-150",
                      isActive
                        ? "text-accent bg-accent-muted"
                        : "text-text-tertiary hover:text-accent hover:bg-accent-muted/50",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

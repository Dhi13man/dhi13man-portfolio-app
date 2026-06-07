import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

// Mock GSAP and its plugins before any component imports
vi.mock("@/lib/gsap", () => {
  const mockTimeline = {
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
  };
  return {
    gsap: {
      to: vi.fn(),
      from: vi.fn(),
      fromTo: vi.fn(),
      set: vi.fn(),
      timeline: vi.fn(() => mockTimeline),
      ticker: {
        add: vi.fn(),
        remove: vi.fn(),
        lagSmoothing: vi.fn(),
      },
    },
    ScrollTrigger: {
      create: vi.fn(),
      refresh: vi.fn(),
      getAll: vi.fn(() => []),
    },
    SplitText: vi.fn(() => ({
      chars: [],
      words: [],
      lines: [],
      revert: vi.fn(),
    })),
    useGSAP: vi.fn((callback: () => void) => {
      // Execute the callback to ensure component logic runs
      try {
        callback();
      } catch {
        // GSAP refs may be null in test, ignore
      }
    }),
  };
});

// Mock Lenis as a class constructor
vi.mock("lenis", () => {
  const LenisMock = vi.fn().mockImplementation(function(this: Record<string, unknown>) {
    this.raf = vi.fn();
    this.destroy = vi.fn();
    this.scrollTo = vi.fn();
  });
  return { default: LenisMock };
});

// Mock useReducedMotion to return false (animations enabled) by default
vi.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: vi.fn(() => false),
}));

// Mock matchMedia for GrowwChapter's desktop detection
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  })),
});

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MetricCounter } from "../MetricCounter";
import { ScrollReveal } from "../ScrollReveal";
import { HeroChapter } from "../HeroChapter";
import { FoundationChapter } from "../FoundationChapter";
import { GrowwChapter } from "../GrowwChapter";
import { VenturesChapter } from "../VenturesChapter";
import { CurrentChapter } from "../CurrentChapter";
import { RipplingChapter } from "../RipplingChapter";
import { CTAChapter } from "../CTAChapter";
import { ChapterNav } from "../ChapterNav";
import { JourneyShell } from "../JourneyShell";

const mockActiveChapterRef = { current: 0 };

// --- MetricCounter ---

describe("MetricCounter", () => {
  describe("MetricCounter_whenRendered_thenDisplaysLabel", () => {
    it("should display the metric label", () => {
      // Arrange & Act
      render(
        <MetricCounter
          value={300}
          suffix="K+"
          label="transactions/day"
        />,
      );

      // Assert
      expect(screen.getByText("transactions/day")).toBeInTheDocument();
    });
  });

  describe("MetricCounter_whenRendered_thenDisplaysSuffix", () => {
    it("should display the suffix", () => {
      // Arrange & Act
      render(
        <MetricCounter value={300} suffix="K+" label="transactions/day" />,
      );

      // Assert
      expect(screen.getByText("K+")).toBeInTheDocument();
    });
  });

  describe("MetricCounter_whenPrefix_thenDisplaysPrefix", () => {
    it("should display prefix when provided", () => {
      // Arrange & Act
      render(
        <MetricCounter
          value={10}
          prefix="<"
          suffix="ms"
          label="latency"
        />,
      );

      // Assert
      expect(screen.getByText("<")).toBeInTheDocument();
    });
  });

  describe("MetricCounter_whenRendered_thenHasScreenReaderValue", () => {
    it("should have sr-only span with the final value", () => {
      // Arrange & Act
      const { container } = render(
        <MetricCounter value={300} suffix="K+" label="transactions/day" />,
      );

      // Assert
      const srOnly = container.querySelector(".sr-only");
      expect(srOnly).toBeInTheDocument();
      expect(srOnly?.textContent).toContain("300");
      expect(srOnly?.textContent).toContain("K+");
      expect(srOnly?.textContent).toContain("transactions/day");
    });
  });
});

// --- ScrollReveal ---

describe("ScrollReveal", () => {
  describe("ScrollReveal_whenRendered_thenDisplaysChildren", () => {
    it("should render children content", () => {
      // Arrange & Act
      render(
        <ScrollReveal>
          <p>Revealed content</p>
        </ScrollReveal>,
      );

      // Assert
      expect(screen.getByText("Revealed content")).toBeInTheDocument();
    });
  });

  describe("ScrollReveal_whenCustomTag_thenUsesTag", () => {
    it("should render with the specified tag", () => {
      // Arrange & Act
      const { container } = render(
        <ScrollReveal as="section">Content</ScrollReveal>,
      );

      // Assert
      expect(container.querySelector("section")).toBeInTheDocument();
    });
  });

  describe("ScrollReveal_whenClassName_thenAppliesIt", () => {
    it("should apply custom className", () => {
      // Arrange & Act
      const { container } = render(
        <ScrollReveal className="custom-class">Content</ScrollReveal>,
      );

      // Assert
      expect(container.firstChild).toHaveClass("custom-class");
    });
  });
});

// --- ChapterNav ---

describe("ChapterNav", () => {
  const mockChapters = [
    { id: "hero", label: "01", title: "Hero", navLabel: "Numbers" },
    { id: "foundation", label: "02", title: "Foundation", navLabel: "Foundation" },
  ];

  describe("ChapterNav_whenRendered_thenHasNavElement", () => {
    it("should render a nav with correct aria-label", () => {
      // Arrange & Act
      render(
        <ChapterNav
          chapters={mockChapters}
          activeChapterRef={mockActiveChapterRef}
          onNavigate={vi.fn()}
        />,
      );

      // Assert
      expect(
        screen.getByRole("navigation", { name: "Chapter navigation" }),
      ).toBeInTheDocument();
    });
  });

  describe("ChapterNav_whenRendered_thenHasButtons", () => {
    it("should render a button for each chapter", () => {
      // Arrange & Act
      render(
        <ChapterNav
          chapters={mockChapters}
          activeChapterRef={mockActiveChapterRef}
          onNavigate={vi.fn()}
        />,
      );

      // Assert
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(mockChapters.length);
    });
  });

  describe("ChapterNav_whenRendered_thenButtonsHaveAriaLabels", () => {
    it("should have accessible labels on each button", () => {
      // Arrange & Act
      render(
        <ChapterNav
          chapters={mockChapters}
          activeChapterRef={mockActiveChapterRef}
          onNavigate={vi.fn()}
        />,
      );

      // Assert
      expect(
        screen.getByRole("button", { name: "Navigate to: Numbers" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Navigate to: Foundation" }),
      ).toBeInTheDocument();
    });
  });
});

// --- HeroChapter ---

describe("HeroChapter", () => {
  describe("HeroChapter_whenRendered_thenDisplaysName", () => {
    it("should render Dhiman Seal heading", () => {
      // Arrange & Act
      render(<HeroChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByRole("heading", { name: /dhiman seal/i }),
      ).toBeInTheDocument();
    });
  });

  describe("HeroChapter_whenRendered_thenHasDataChapter", () => {
    it("should have data-chapter attribute for scroll targeting", () => {
      // Arrange & Act
      const { container } = render(
        <HeroChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(
        container.querySelector('[data-chapter="hero"]'),
      ).toBeInTheDocument();
    });
  });

  describe("HeroChapter_whenRendered_thenDisplaysAllMetrics", () => {
    it("should render all 6 hero metrics", () => {
      // Arrange & Act
      render(<HeroChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(screen.getByText("transactions/day")).toBeInTheDocument();
      expect(screen.getByText("users served")).toBeInTheDocument();
      expect(screen.getByText("years experience")).toBeInTheDocument();
      expect(screen.getByText("startup acquired")).toBeInTheDocument();
      expect(screen.getByText("1st place wins")).toBeInTheDocument();
      expect(screen.getByText("paying customers")).toBeInTheDocument();
    });
  });

  describe("HeroChapter_whenRendered_thenHasScrollPrompt", () => {
    it("should display scroll prompt", () => {
      // Arrange & Act
      render(<HeroChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(screen.getByText("Scroll to begin")).toBeInTheDocument();
    });
  });

  describe("HeroChapter_whenRendered_thenHasNoAccessibilityViolations", () => {
    it("should have no axe accessibility violations", async () => {
      // Arrange & Act
      const { container } = render(
        <HeroChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

// --- FoundationChapter ---

describe("FoundationChapter", () => {
  describe("FoundationChapter_whenRendered_thenDisplaysTitle", () => {
    it("should render the chapter title", () => {
      // Arrange & Act
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(
        screen.getByRole("heading", { name: /every builder has a beginning/i }),
      ).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenRendered_thenDisplaysCards", () => {
    it("should render NIT Silchar and TechEngio cards", () => {
      // Arrange & Act
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("NIT Silchar")).toBeInTheDocument();
      expect(screen.getByText(/TechEngio/)).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenRendered_thenHasNarrative", () => {
    it("should render the foundation narrative", () => {
      // Arrange & Act
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(
        screen.getByText(/Before I wrote my first line of production code/i),
      ).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenRendered_thenHasNoAccessibilityViolations", () => {
    it("should have no axe accessibility violations", async () => {
      // Arrange & Act
      const { container } = render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

// --- GrowwChapter ---

describe("GrowwChapter", () => {
  describe("GrowwChapter_whenRendered_thenDisplaysTitle", () => {
    it("should render the chapter title", () => {
      // Arrange & Act
      render(<GrowwChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByRole("heading", { name: /building at scale/i }),
      ).toBeInTheDocument();
    });
  });

  describe("GrowwChapter_whenRendered_thenDisplaysRoles", () => {
    it("should render all 3 Groww roles", () => {
      // Arrange & Act
      render(<GrowwChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(screen.getByText("Software Engineer Intern")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer 1")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer 2")).toBeInTheDocument();
    });
  });

  describe("GrowwChapter_whenRendered_thenDisplaysMetricPills", () => {
    it("should display key metric pills", () => {
      // Arrange & Act
      render(<GrowwChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(screen.getByText("300K+ daily txns")).toBeInTheDocument();
      expect(screen.getByText("3 greenfield projects")).toBeInTheDocument();
    });
  });

  describe("GrowwChapter_whenRendered_thenHasNoAccessibilityViolations", () => {
    it("should have no axe accessibility violations", async () => {
      // Arrange & Act
      const { container } = render(
        <GrowwChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

// --- VenturesChapter ---

describe("VenturesChapter", () => {
  describe("VenturesChapter_whenRendered_thenDisplaysAgriJod", () => {
    it("should render AgriJod with ACQUIRED badge", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("AgriJod")).toBeInTheDocument();
      expect(screen.getByText("ACQUIRED")).toBeInTheDocument();
    });
  });

  describe("VenturesChapter_whenRendered_thenDisplaysBanalo", () => {
    it("should render Banalo with Closed badge", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("Banalo")).toBeInTheDocument();
      // Multiple ventures may be "Closed" (Banalo + OnlyForms)
      expect(screen.getAllByText("Closed").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("VenturesChapter_whenRendered_thenDisplaysNarrative", () => {
    it("should render the parallel builder narrative", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(
        screen.getByText(/while building at scale during the day/i),
      ).toBeInTheDocument();
    });
  });

  describe("VenturesChapter_whenRendered_thenHasNoAccessibilityViolations", () => {
    it("should have no axe accessibility violations", async () => {
      // Arrange & Act
      const { container } = render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

// --- CurrentChapter ---

describe("CurrentChapter", () => {
  describe("CurrentChapter_whenRendered_thenDisplaysEzHomeo", () => {
    it("should render EzHomeo details", () => {
      // Arrange & Act
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("EzHomeo")).toBeInTheDocument();
      expect(screen.getByText("5 paying customers")).toBeInTheDocument();
    });
  });

  describe("CurrentChapter_whenRendered_thenDisplaysOSS", () => {
    it("should render open source highlights", () => {
      // Arrange & Act
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("spring-multi-data-source")).toBeInTheDocument();
      expect(screen.getByText("open_route_service")).toBeInTheDocument();
    });
  });

  describe("CurrentChapter_whenRendered_thenDisplaysTechStack", () => {
    it("should render tech stack pills", () => {
      // Arrange & Act
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("Java")).toBeInTheDocument();
      expect(screen.getByText("Spring Boot")).toBeInTheDocument();
    });
  });

  describe("CurrentChapter_whenRendered_thenHasNoAccessibilityViolations", () => {
    it("should have no axe accessibility violations", async () => {
      // Arrange & Act
      const { container } = render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

// --- RipplingChapter ---

describe("RipplingChapter", () => {
  describe("RipplingChapter_whenRendered_thenDisplaysTitle", () => {
    it("should render the chapter title", () => {
      // Arrange & Act
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByRole("heading", { name: /a new chapter at rippling/i }),
      ).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenRendered_thenDisplaysCompanyLink", () => {
    it("should render Rippling as a link with safe href, target, and rel", () => {
      // Arrange & Act
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      const link = screen.getByRole("link", { name: "Rippling" });
      expect(link).toHaveAttribute("href", "https://www.rippling.com");
      expect(link).toHaveAttribute("target", "_blank");
      // rel guards against reverse tabnabbing on target="_blank"
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("RipplingChapter_whenRendered_thenDisplaysCompanyAbout", () => {
    it("should render the company description", () => {
      // Arrange & Act
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByText(/all-in-one workforce platform/i),
      ).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenRendered_thenDisplaysNarrative", () => {
    it("should render the next-chapter narrative", () => {
      // Arrange & Act
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByText(/after four amazing years at groww/i),
      ).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenRendered_thenHasDataChapter", () => {
    it("should have data-chapter='rippling' for scroll targeting", () => {
      // Arrange & Act
      const { container } = render(
        <RipplingChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(
        container.querySelector('[data-chapter="rippling"]'),
      ).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenRendered_thenDisplaysRoleAndDate", () => {
    it("should render the full-stack role label and tenure", () => {
      // Arrange & Act
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByText("Software Engineer 2 - Full-Stack"),
      ).toBeInTheDocument();
      expect(screen.getByText("May 2026 - Present")).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenRendered_thenDisplaysPills", () => {
    it("should render the focus-area pills", () => {
      // Arrange & Act
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(screen.getByText("Full-Stack")).toBeInTheDocument();
      expect(screen.getByText("PEO Team")).toBeInTheDocument();
      expect(screen.getByText("Underwriting")).toBeInTheDocument();
      expect(screen.getByText("Workers' Comp")).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenRendered_thenDisplaysDetailBullets", () => {
    it("should render the PEO and Underwriting detail bullets", () => {
      // Arrange & Act
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByText(/Full-stack engineer on the PEO/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Improving Underwriting and Workers' Compensation flows/i,
        ),
      ).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenRendered_thenDisplaysClosing", () => {
    it("should render the closing line", () => {
      // Arrange & Act
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByText(/Same obsession with systems that scale/i),
      ).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenRendered_thenHasNoAccessibilityViolations", () => {
    it("should have no axe accessibility violations", async () => {
      // Arrange & Act
      const { container } = render(
        <RipplingChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

// --- CTAChapter ---

describe("CTAChapter", () => {
  describe("CTAChapter_whenRendered_thenDisplaysHeading", () => {
    it("should render What's next heading", () => {
      // Arrange & Act
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByRole("heading", { name: /what's next/i }),
      ).toBeInTheDocument();
    });
  });

  describe("CTAChapter_whenRendered_thenHasCTAButtons", () => {
    it("should render Let's talk and View experience buttons", () => {
      // Arrange & Act
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByRole("link", { name: /let's talk/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /view experience/i }),
      ).toBeInTheDocument();
    });
  });

  describe("CTAChapter_whenRendered_thenHasSocialLinks", () => {
    it("should render social link icons", () => {
      // Arrange & Act
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "LinkedIn" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Email" })).toBeInTheDocument();
    });
  });

  describe("CTAChapter_whenRendered_thenCTALinksCorrect", () => {
    it("should have correct email href on CTA", () => {
      // Arrange & Act
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      const ctaLink = screen.getByRole("link", { name: /let's talk/i });
      expect(ctaLink).toHaveAttribute(
        "href",
        "mailto:dhiman.seal@hotmail.com",
      );
    });
  });

  describe("CTAChapter_whenRendered_thenHasNoAccessibilityViolations", () => {
    it("should have no axe accessibility violations", async () => {
      // Arrange & Act
      const { container } = render(
        <CTAChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(await axe(container)).toHaveNoViolations();
    });
  });
});

// --- JourneyShell ---

describe("JourneyShell", () => {
  describe("JourneyShell_whenRendered_thenMountsAllChapters", () => {
    it("should render all 7 chapter sections", () => {
      // Arrange & Act
      const { container } = render(<JourneyShell />);

      // Assert
      const sections = container.querySelectorAll("[data-chapter]");
      expect(sections.length).toBe(7);
    });
  });

  describe("JourneyShell_whenRendered_thenHasChapterNav", () => {
    it("should render chapter navigation", () => {
      // Arrange & Act
      render(<JourneyShell />);

      // Assert
      expect(
        screen.getByRole("navigation", { name: "Chapter navigation" }),
      ).toBeInTheDocument();
    });
  });

  describe("JourneyShell_whenMounted_thenAddsImmersiveClass", () => {
    it("should add journey-immersive class to body", () => {
      // Arrange & Act
      render(<JourneyShell />);

      // Assert
      expect(document.body.classList.contains("journey-immersive")).toBe(true);
    });
  });

  describe("JourneyShell_whenUnmounted_thenRemovesImmersiveClass", () => {
    it("should remove journey-immersive class on unmount", () => {
      // Arrange
      const { unmount } = render(<JourneyShell />);

      // Act
      unmount();

      // Assert
      expect(document.body.classList.contains("journey-immersive")).toBe(false);
    });
  });
});

// --- Reduced Motion Tests ---

describe("ReducedMotion", () => {
  beforeEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(true);
  });

  afterEach(() => {
    vi.mocked(useReducedMotion).mockReturnValue(false);
  });

  describe("MetricCounter_whenReducedMotion_thenShowsFinalValue", () => {
    it("should display the final value immediately", () => {
      // Arrange & Act
      const { container } = render(
        <MetricCounter value={300} suffix="K+" label="transactions/day" />,
      );

      // Assert
      // With reduced motion, the number shows the final value, not 0
      const numberEl = container.querySelector("[aria-hidden]");
      expect(numberEl?.textContent).toBe("300");
    });
  });

  describe("HeroChapter_whenReducedMotion_thenStillRendersContent", () => {
    it("should render all content without animation", () => {
      // Arrange & Act
      render(<HeroChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(screen.getByText("Dhiman Seal")).toBeInTheDocument();
      expect(screen.getByText("transactions/day")).toBeInTheDocument();
      expect(screen.getByText("Scroll to begin")).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenReducedMotion_thenStillRendersCards", () => {
    it("should render all cards without stagger animation", () => {
      // Arrange & Act
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("NIT Silchar")).toBeInTheDocument();
      expect(screen.getByText(/TechEngio/)).toBeInTheDocument();
    });
  });

  describe("GrowwChapter_whenReducedMotion_thenRendersVerticalStack", () => {
    it("should render all roles in vertical layout", () => {
      // Arrange & Act
      render(<GrowwChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(screen.getByText("Software Engineer 2")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer 1")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer Intern")).toBeInTheDocument();
    });
  });

  describe("VenturesChapter_whenReducedMotion_thenStillShowsGlow", () => {
    it("should still render AgriJod and Banalo correctly", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("AgriJod")).toBeInTheDocument();
      expect(screen.getByText("Banalo")).toBeInTheDocument();
    });
  });

  describe("RipplingChapter_whenReducedMotion_thenStillRendersContent", () => {
    it("should render the Rippling card and details without animation", () => {
      // Arrange & Act (reduced motion enabled via the block's beforeEach)
      render(<RipplingChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      expect(
        screen.getByRole("link", { name: "Rippling" }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /Improving Underwriting and Workers' Compensation flows/i,
        ),
      ).toBeInTheDocument();
    });
  });
});

// --- MetricCounter: formatNumber branches ---

describe("MetricCounter formatNumber branches", () => {
  describe("MetricCounter_whenValueGte1000_thenFormatsWithLocale", () => {
    it("should format large values with locale separators in sr-only", () => {
      // Arrange & Act
      const { container } = render(
        <MetricCounter value={1500} suffix="" label="records" />,
      );

      // Assert
      const srOnly = container.querySelector(".sr-only");
      // en-IN locale formats 1500 as "1,500"
      expect(srOnly?.textContent).toContain("1,500");
    });
  });

  describe("MetricCounter_whenValueIsInteger_thenRoundsToString", () => {
    it("should format integer values as rounded strings in sr-only", () => {
      // Arrange & Act
      const { container } = render(
        <MetricCounter value={42} suffix="x" label="multiplier" />,
      );

      // Assert
      const srOnly = container.querySelector(".sr-only");
      expect(srOnly?.textContent).toContain("42");
    });
  });

  describe("MetricCounter_whenValueIsDecimal_thenFormatsToOneDecimal", () => {
    it("should format decimal values with one decimal place", () => {
      // Arrange & Act
      const { container } = render(
        <MetricCounter value={3.7} suffix="s" label="response time" />,
      );

      // Assert
      const srOnly = container.querySelector(".sr-only");
      expect(srOnly?.textContent).toContain("3.7");
    });
  });

  describe("MetricCounter_whenValueIsZero_thenDisplaysZero", () => {
    it("should display zero value correctly", () => {
      // Arrange & Act
      const { container } = render(
        <MetricCounter value={0} suffix="" label="errors" />,
      );

      // Assert
      const srOnly = container.querySelector(".sr-only");
      expect(srOnly?.textContent).toContain("0");
      expect(screen.getByText("errors")).toBeInTheDocument();
    });
  });

  describe("MetricCounter_whenNoPrefix_thenOmitsPrefix", () => {
    it("should not render a prefix element when prefix is undefined", () => {
      // Arrange & Act
      const { container } = render(
        <MetricCounter value={10} suffix="+" label="items" />,
      );

      // Assert
      // The sr-only should not start with "undefined"
      const srOnly = container.querySelector(".sr-only");
      expect(srOnly?.textContent).not.toContain("undefined");
    });
  });
});

// --- ChapterNav: interaction and a11y ---

describe("ChapterNav interactions", () => {
  const mockChapters = [
    { id: "hero", label: "01", title: "Hero", navLabel: "Numbers" },
    { id: "foundation", label: "02", title: "Foundation", navLabel: "Foundation" },
    { id: "groww", label: "03", title: "Groww", navLabel: "Groww" },
  ];

  describe("ChapterNav_whenButtonClicked_thenCallsOnNavigate", () => {
    it("should call onNavigate with the correct index", async () => {
      // Arrange
      const mockOnNavigate = vi.fn();
      const user = userEvent.setup();

      render(
        <ChapterNav
          chapters={mockChapters}
          activeChapterRef={mockActiveChapterRef}
          onNavigate={mockOnNavigate}
        />,
      );

      // Act
      const foundationBtn = screen.getByRole("button", { name: "Navigate to: Foundation" });
      await user.click(foundationBtn);

      // Assert
      expect(mockOnNavigate).toHaveBeenCalledWith(1);
    });
  });

  describe("ChapterNav_whenChapterActive_thenHasAriaCurrent", () => {
    it("should set aria-current='step' on the active chapter button", () => {
      // Arrange
      // activeChapterRef.current = 0 means first chapter is active
      const activeRef = { current: 0 };

      // Act
      // The ChapterNav uses gsap.ticker to sync, but in tests the ticker callback
      // runs immediately due to our mock. The initial useState(0) matches index 0.
      render(
        <ChapterNav
          chapters={mockChapters}
          activeChapterRef={activeRef}
          onNavigate={vi.fn()}
        />,
      );

      // Assert
      const firstButton = screen.getByRole("button", { name: "Navigate to: Numbers" });
      expect(firstButton).toHaveAttribute("aria-current", "step");

      const secondButton = screen.getByRole("button", { name: "Navigate to: Foundation" });
      expect(secondButton).not.toHaveAttribute("aria-current");
    });
  });
});

// --- FoundationChapter: lightbox, links, truncation ---

describe("FoundationChapter details", () => {
  describe("FoundationChapter_whenCardHasLink_thenRendersExternalLink", () => {
    it("should render card titles as links when link is provided", () => {
      // Arrange & Act
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      // NIT Silchar has link: "https://www.nits.ac.in/"
      const nitLink = screen.getByRole("link", { name: "NIT Silchar" });
      expect(nitLink).toHaveAttribute("href", "https://www.nits.ac.in/");
      expect(nitLink).toHaveAttribute("target", "_blank");
      expect(nitLink).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  describe("FoundationChapter_whenCardHasImage_thenRendersImageButton", () => {
    it("should render image buttons with accessible labels", () => {
      // Arrange & Act
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      // TechEngio card has an image
      const imgButton = screen.getByRole("button", { name: /View.*TechEngio.*image/i });
      expect(imgButton).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenCardHasMoreThan3Details_thenShowsTruncation", () => {
    it("should show '+X more' for cards with more than 3 details", () => {
      // Arrange & Act
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      // Early Hackathon Wins has 6 details, shows 3 + "+3 more"
      expect(screen.getByText("+3 more")).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenImageButtonClicked_thenShowsLightbox", () => {
    it("should open lightbox dialog when image button is clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Act
      const imgButton = screen.getByRole("button", { name: /View.*TechEngio.*image/i });
      await user.click(imgButton);

      // Assert
      const dialog = screen.getByRole("dialog", { name: "Image preview" });
      expect(dialog).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenLightboxOpen_thenCloseButtonWorks", () => {
    it("should close lightbox when close button is clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Open lightbox
      const imgButton = screen.getByRole("button", { name: /View.*TechEngio.*image/i });
      await user.click(imgButton);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Act
      // Close lightbox
      const closeButton = screen.getByRole("button", { name: "Close image preview" });
      await user.click(closeButton);

      // Assert
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenLightboxOpen_thenEscapeCloses", () => {
    it("should close lightbox when Escape key is pressed", async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Open lightbox
      const imgButton = screen.getByRole("button", { name: /View.*TechEngio.*image/i });
      await user.click(imgButton);
      expect(screen.getByRole("dialog")).toBeInTheDocument();

      // Act
      // Press Escape — the dialog has tabIndex={-1} and receives focus via lightboxCloseRef
      await user.keyboard("{Escape}");

      // Assert
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenRendered_thenDisplaysCardDates", () => {
    it("should display dates for each card", () => {
      // Arrange & Act
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("2018 - 2022")).toBeInTheDocument();
      expect(screen.getByText("2018 - 2020")).toBeInTheDocument();
    });
  });
});

// --- VenturesChapter: links, badges, all ventures ---

describe("VenturesChapter details", () => {
  describe("VenturesChapter_whenVentureHasLink_thenWrapsInAnchor", () => {
    it("should wrap AgriJod in an external link", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      // AgriJod has link: "https://agrijod.in"
      const agriJodLink = screen.getByRole("link", { name: /AgriJod/i });
      expect(agriJodLink).toHaveAttribute("href", "https://agrijod.in");
      expect(agriJodLink).toHaveAttribute("target", "_blank");
    });
  });

  describe("VenturesChapter_whenVentureHasNoLink_thenNoAnchorWrapper", () => {
    it("should render Dostana.AI without link wrapper", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      const dostanaHeading = screen.getByText("Dostana.AI");
      // Dostana.AI has no link — the article should not be inside an <a>
      expect(dostanaHeading.closest("a")).toBeNull();
    });
  });

  describe("VenturesChapter_whenRendered_thenDisplaysOnlyForms", () => {
    it("should render OnlyForms venture", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("OnlyForms")).toBeInTheDocument();
    });
  });

  describe("VenturesChapter_whenVentureHasMultipleBadges_thenRendersAll", () => {
    it("should render multiple badges for Dostana.AI", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText(/National Runner-up, Build for Bharat/)).toBeInTheDocument();
      expect(screen.getByText(/National Winner, Tata Imagination/)).toBeInTheDocument();
    });
  });

  describe("VenturesChapter_whenVentureHasDetails_thenRendersDetailBullets", () => {
    it("should render AgriJod detail bullets", () => {
      // Arrange & Act
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText(/Built the full tech stack/)).toBeInTheDocument();
      expect(screen.getByText(/Ran the tech transfer/)).toBeInTheDocument();
    });
  });
});

// --- CurrentChapter: links and content ---

describe("CurrentChapter details", () => {
  describe("CurrentChapter_whenRendered_thenEzHomeoLinkCorrect", () => {
    it("should render EzHomeo as a link with correct href", () => {
      // Arrange & Act
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      const ezHomeoLink = screen.getByRole("link", { name: "EzHomeo" });
      expect(ezHomeoLink).toHaveAttribute("href", "https://www.ezhomeo.com");
      expect(ezHomeoLink).toHaveAttribute("target", "_blank");
    });
  });

  describe("CurrentChapter_whenRendered_thenOSSProjectLinksCorrect", () => {
    it("should render OSS project links with correct hrefs", () => {
      // Arrange & Act
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      const springLink = screen.getByRole("link", { name: "spring-multi-data-source" });
      expect(springLink).toHaveAttribute(
        "href",
        "https://github.com/Dhi13man/spring-multi-data-source",
      );

      const orsLink = screen.getByRole("link", { name: "open_route_service" });
      expect(orsLink).toHaveAttribute(
        "href",
        "https://pub.dev/packages/open_route_service",
      );
    });
  });

  describe("CurrentChapter_whenRendered_thenDisplaysOSSSummary", () => {
    it("should display project count and star count", () => {
      // Arrange & Act
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("45+")).toBeInTheDocument();
      expect(screen.getByText("150+")).toBeInTheDocument();
    });
  });

  describe("CurrentChapter_whenRendered_thenDisplaysEzHomeoTechStack", () => {
    it("should render EzHomeo tech stack info", () => {
      // Arrange & Act
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText(/EzHomeo stack:/)).toBeInTheDocument();
    });
  });

  describe("CurrentChapter_whenRendered_thenDisplaysOSSMetrics", () => {
    it("should render metrics for OSS projects", () => {
      // Arrange & Act
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(screen.getByText("95% team adoption")).toBeInTheDocument();
      expect(screen.getByText("85+ likes, 160/160 score")).toBeInTheDocument();
    });
  });
});

// --- CTAChapter: comprehensive links ---

describe("CTAChapter details", () => {
  describe("CTAChapter_whenRendered_thenAllSocialLinksPresent", () => {
    it.each([
      ["GitHub", "https://github.com/Dhi13man"],
      ["LinkedIn", "https://www.linkedin.com/in/dhi13man/"],
      ["Medium", "https://medium.com/@dhi13man"],
      ["Twitter", "https://twitter.com/Dhi13man"],
      ["Email", "mailto:dhiman.seal@hotmail.com"],
    ])("should render %s social link with correct href", (label, href) => {
      // Arrange & Act
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      const link = screen.getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
    });
  });

  describe("CTAChapter_whenRendered_thenExplorePortfolioLinkPresent", () => {
    it("should render the Explore the portfolio link", () => {
      // Arrange & Act
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      const link = screen.getByRole("link", { name: /explore the portfolio/i });
      expect(link).toHaveAttribute("href", "/");
    });
  });

  describe("CTAChapter_whenRendered_thenViewExperienceLinkCorrect", () => {
    it("should point View experience to /experience/", () => {
      // Arrange & Act
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      const link = screen.getByRole("link", { name: /view experience/i });
      expect(link).toHaveAttribute("href", "/experience/");
    });
  });

  describe("CTAChapter_whenRendered_thenDisplaysCopyrightWithCurrentYear", () => {
    it("should display copyright with the current year", () => {
      // Arrange & Act
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);

      // Assert
      const year = new Date().getFullYear().toString();
      expect(screen.getByText(new RegExp(`© ${year}`))).toBeInTheDocument();
    });
  });

  describe("CTAChapter_whenRendered_thenHasDataChapter", () => {
    it("should have data-chapter='cta' for scroll targeting", () => {
      // Arrange & Act
      const { container } = render(
        <CTAChapter activeChapterRef={mockActiveChapterRef} />,
      );

      // Assert
      expect(container.querySelector('[data-chapter="cta"]')).toBeInTheDocument();
    });
  });
});

// --- JourneyShell: skip link, home link, lenis-active ---

describe("JourneyShell details", () => {
  describe("JourneyShell_whenRendered_thenHasSkipLink", () => {
    it("should render a skip link for keyboard navigation", () => {
      // Arrange & Act
      render(<JourneyShell />);

      // Assert
      const skipLink = screen.getByRole("link", { name: "Skip to content" });
      expect(skipLink).toHaveAttribute("href", "#chapter-hero");
    });
  });

  describe("JourneyShell_whenRendered_thenHasHomeLink", () => {
    it("should render DS home link with correct aria-label", () => {
      // Arrange & Act
      render(<JourneyShell />);

      // Assert
      const homeLink = screen.getByRole("link", { name: "Back to portfolio home" });
      expect(homeLink).toHaveAttribute("href", "/");
      expect(homeLink).toHaveTextContent("DS");
    });
  });

  describe("JourneyShell_whenMounted_thenAddsLenisActiveClass", () => {
    it("should add lenis-active class to html element", () => {
      // Arrange & Act
      render(<JourneyShell />);

      // Assert
      expect(
        document.documentElement.classList.contains("lenis-active"),
      ).toBe(true);
    });
  });

  describe("JourneyShell_whenUnmounted_thenRemovesLenisActiveClass", () => {
    it("should remove lenis-active class on unmount", () => {
      // Arrange
      const { unmount } = render(<JourneyShell />);

      // Act
      unmount();

      // Assert
      expect(
        document.documentElement.classList.contains("lenis-active"),
      ).toBe(false);
    });
  });

  describe("JourneyShell_whenRendered_thenAllChaptersHaveIds", () => {
    it("should render all chapter sections with correct IDs for anchor links", () => {
      // Arrange & Act
      const { container } = render(<JourneyShell />);

      // Assert
      const expectedIds = [
        "chapter-hero",
        "chapter-foundation",
        "chapter-groww",
        "chapter-ventures",
        "chapter-current",
        "chapter-rippling",
        "chapter-cta",
      ];
      expectedIds.forEach((id) => {
        expect(container.querySelector(`#${id}`)).toBeInTheDocument();
      });
    });
  });
});

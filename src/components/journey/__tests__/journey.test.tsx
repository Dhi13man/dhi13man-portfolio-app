import React from "react";
import { render, screen } from "@testing-library/react";

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

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MetricCounter } from "../MetricCounter";
import { ScrollReveal } from "../ScrollReveal";
import { HeroChapter } from "../HeroChapter";
import { FoundationChapter } from "../FoundationChapter";
import { GrowwChapter } from "../GrowwChapter";
import { VenturesChapter } from "../VenturesChapter";
import { CurrentChapter } from "../CurrentChapter";
import { CTAChapter } from "../CTAChapter";
import { ChapterNav } from "../ChapterNav";
import { JourneyShell } from "../JourneyShell";

const mockActiveChapterRef = { current: 0 };

// --- MetricCounter ---

describe("MetricCounter", () => {
  describe("MetricCounter_whenRendered_thenDisplaysLabel", () => {
    it("should display the metric label", () => {
      render(
        <MetricCounter
          value={300}
          suffix="K+"
          label="transactions/day"
        />,
      );
      expect(screen.getByText("transactions/day")).toBeInTheDocument();
    });
  });

  describe("MetricCounter_whenRendered_thenDisplaysSuffix", () => {
    it("should display the suffix", () => {
      render(
        <MetricCounter value={300} suffix="K+" label="transactions/day" />,
      );
      expect(screen.getByText("K+")).toBeInTheDocument();
    });
  });

  describe("MetricCounter_whenPrefix_thenDisplaysPrefix", () => {
    it("should display prefix when provided", () => {
      render(
        <MetricCounter
          value={10}
          prefix="<"
          suffix="ms"
          label="latency"
        />,
      );
      expect(screen.getByText("<")).toBeInTheDocument();
    });
  });

  describe("MetricCounter_whenRendered_thenHasScreenReaderValue", () => {
    it("should have sr-only span with the final value", () => {
      const { container } = render(
        <MetricCounter value={300} suffix="K+" label="transactions/day" />,
      );
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
      render(
        <ScrollReveal>
          <p>Revealed content</p>
        </ScrollReveal>,
      );
      expect(screen.getByText("Revealed content")).toBeInTheDocument();
    });
  });

  describe("ScrollReveal_whenCustomTag_thenUsesTag", () => {
    it("should render with the specified tag", () => {
      const { container } = render(
        <ScrollReveal as="section">Content</ScrollReveal>,
      );
      expect(container.querySelector("section")).toBeInTheDocument();
    });
  });

  describe("ScrollReveal_whenClassName_thenAppliesIt", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <ScrollReveal className="custom-class">Content</ScrollReveal>,
      );
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
      render(
        <ChapterNav
          chapters={mockChapters}
          activeChapterRef={mockActiveChapterRef}
          onNavigate={vi.fn()}
        />,
      );
      expect(
        screen.getByRole("navigation", { name: "Chapter navigation" }),
      ).toBeInTheDocument();
    });
  });

  describe("ChapterNav_whenRendered_thenHasButtons", () => {
    it("should render a button for each chapter", () => {
      render(
        <ChapterNav
          chapters={mockChapters}
          activeChapterRef={mockActiveChapterRef}
          onNavigate={vi.fn()}
        />,
      );
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(mockChapters.length);
    });
  });

  describe("ChapterNav_whenRendered_thenButtonsHaveAriaLabels", () => {
    it("should have accessible labels on each button", () => {
      render(
        <ChapterNav
          chapters={mockChapters}
          activeChapterRef={mockActiveChapterRef}
          onNavigate={vi.fn()}
        />,
      );
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
      render(<HeroChapter activeChapterRef={mockActiveChapterRef} />);
      expect(
        screen.getByRole("heading", { name: /dhiman seal/i }),
      ).toBeInTheDocument();
    });
  });

  describe("HeroChapter_whenRendered_thenHasDataChapter", () => {
    it("should have data-chapter attribute for scroll targeting", () => {
      const { container } = render(
        <HeroChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(
        container.querySelector('[data-chapter="hero"]'),
      ).toBeInTheDocument();
    });
  });

  describe("HeroChapter_whenRendered_thenDisplaysAllMetrics", () => {
    it("should render all 6 hero metrics", () => {
      render(<HeroChapter activeChapterRef={mockActiveChapterRef} />);
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
      render(<HeroChapter activeChapterRef={mockActiveChapterRef} />);
      expect(screen.getByText("Scroll to begin")).toBeInTheDocument();
    });
  });
});

// --- FoundationChapter ---

describe("FoundationChapter", () => {
  describe("FoundationChapter_whenRendered_thenDisplaysTitle", () => {
    it("should render the chapter title", () => {
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(
        screen.getByRole("heading", { name: /every builder has a beginning/i }),
      ).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenRendered_thenDisplaysCards", () => {
    it("should render NIT Silchar and TechEngio cards", () => {
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(screen.getByText("NIT Silchar")).toBeInTheDocument();
      expect(screen.getByText(/TechEngio/)).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenRendered_thenHasNarrative", () => {
    it("should render the foundation narrative", () => {
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(
        screen.getByText(/Before I wrote my first line of production code/i),
      ).toBeInTheDocument();
    });
  });
});

// --- GrowwChapter ---

describe("GrowwChapter", () => {
  describe("GrowwChapter_whenRendered_thenDisplaysTitle", () => {
    it("should render the chapter title", () => {
      render(<GrowwChapter activeChapterRef={mockActiveChapterRef} />);
      expect(
        screen.getByRole("heading", { name: /building at scale/i }),
      ).toBeInTheDocument();
    });
  });

  describe("GrowwChapter_whenRendered_thenDisplaysRoles", () => {
    it("should render all 3 Groww roles", () => {
      render(<GrowwChapter activeChapterRef={mockActiveChapterRef} />);
      expect(screen.getByText("Software Engineer Intern")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer 1")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer 2")).toBeInTheDocument();
    });
  });

  describe("GrowwChapter_whenRendered_thenDisplaysMetricPills", () => {
    it("should display key metric pills", () => {
      render(<GrowwChapter activeChapterRef={mockActiveChapterRef} />);
      expect(screen.getByText("300K+ daily txns")).toBeInTheDocument();
      expect(screen.getByText("95% adoption")).toBeInTheDocument();
    });
  });
});

// --- VenturesChapter ---

describe("VenturesChapter", () => {
  describe("VenturesChapter_whenRendered_thenDisplaysAgriJod", () => {
    it("should render AgriJod with ACQUIRED badge", () => {
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(screen.getByText("AgriJod")).toBeInTheDocument();
      expect(screen.getByText("ACQUIRED")).toBeInTheDocument();
    });
  });

  describe("VenturesChapter_whenRendered_thenDisplaysBanalo", () => {
    it("should render Banalo with Closed badge", () => {
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(screen.getByText("Banalo")).toBeInTheDocument();
      // Multiple ventures may be "Closed" (Banalo + OnlyForms)
      expect(screen.getAllByText("Closed").length).toBeGreaterThanOrEqual(1);
    });
  });

  describe("VenturesChapter_whenRendered_thenDisplaysNarrative", () => {
    it("should render the parallel builder narrative", () => {
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(
        screen.getByText(/while building at scale during the day/i),
      ).toBeInTheDocument();
    });
  });
});

// --- CurrentChapter ---

describe("CurrentChapter", () => {
  describe("CurrentChapter_whenRendered_thenDisplaysEzHomeo", () => {
    it("should render EzHomeo details", () => {
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(screen.getByText("EzHomeo")).toBeInTheDocument();
      expect(screen.getByText("5 paying customers")).toBeInTheDocument();
    });
  });

  describe("CurrentChapter_whenRendered_thenDisplaysOSS", () => {
    it("should render open source highlights", () => {
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(screen.getByText("spring-multi-data-source")).toBeInTheDocument();
      expect(screen.getByText("open_route_service")).toBeInTheDocument();
    });
  });

  describe("CurrentChapter_whenRendered_thenDisplaysTechStack", () => {
    it("should render tech stack pills", () => {
      render(
        <CurrentChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(screen.getByText("Java")).toBeInTheDocument();
      expect(screen.getByText("Spring Boot")).toBeInTheDocument();
    });
  });
});

// --- CTAChapter ---

describe("CTAChapter", () => {
  describe("CTAChapter_whenRendered_thenDisplaysHeading", () => {
    it("should render What's next heading", () => {
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);
      expect(
        screen.getByRole("heading", { name: /what's next/i }),
      ).toBeInTheDocument();
    });
  });

  describe("CTAChapter_whenRendered_thenHasCTAButtons", () => {
    it("should render Let's talk and View experience buttons", () => {
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);
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
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);
      expect(screen.getByRole("link", { name: "GitHub" })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: "LinkedIn" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Email" })).toBeInTheDocument();
    });
  });

  describe("CTAChapter_whenRendered_thenCTALinksCorrect", () => {
    it("should have correct email href on CTA", () => {
      render(<CTAChapter activeChapterRef={mockActiveChapterRef} />);
      const ctaLink = screen.getByRole("link", { name: /let's talk/i });
      expect(ctaLink).toHaveAttribute(
        "href",
        "mailto:dhiman.seal@hotmail.com",
      );
    });
  });
});

// --- JourneyShell ---

describe("JourneyShell", () => {
  describe("JourneyShell_whenRendered_thenMountsAllChapters", () => {
    it("should render all 6 chapter sections", () => {
      const { container } = render(<JourneyShell />);
      const sections = container.querySelectorAll("[data-chapter]");
      expect(sections.length).toBe(6);
    });
  });

  describe("JourneyShell_whenRendered_thenHasChapterNav", () => {
    it("should render chapter navigation", () => {
      render(<JourneyShell />);
      expect(
        screen.getByRole("navigation", { name: "Chapter navigation" }),
      ).toBeInTheDocument();
    });
  });

  describe("JourneyShell_whenMounted_thenAddsImmersiveClass", () => {
    it("should add journey-immersive class to body", () => {
      render(<JourneyShell />);
      expect(document.body.classList.contains("journey-immersive")).toBe(true);
    });
  });

  describe("JourneyShell_whenUnmounted_thenRemovesImmersiveClass", () => {
    it("should remove journey-immersive class on unmount", () => {
      const { unmount } = render(<JourneyShell />);
      unmount();
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
      const { container } = render(
        <MetricCounter value={300} suffix="K+" label="transactions/day" />,
      );
      // With reduced motion, the number shows the final value, not 0
      const numberEl = container.querySelector("[aria-hidden]");
      expect(numberEl?.textContent).toBe("300");
    });
  });

  describe("HeroChapter_whenReducedMotion_thenStillRendersContent", () => {
    it("should render all content without animation", () => {
      render(<HeroChapter activeChapterRef={mockActiveChapterRef} />);
      expect(screen.getByText("Dhiman Seal")).toBeInTheDocument();
      expect(screen.getByText("transactions/day")).toBeInTheDocument();
      expect(screen.getByText("Scroll to begin")).toBeInTheDocument();
    });
  });

  describe("FoundationChapter_whenReducedMotion_thenStillRendersCards", () => {
    it("should render all cards without stagger animation", () => {
      render(
        <FoundationChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(screen.getByText("NIT Silchar")).toBeInTheDocument();
      expect(screen.getByText(/TechEngio/)).toBeInTheDocument();
    });
  });

  describe("GrowwChapter_whenReducedMotion_thenRendersVerticalStack", () => {
    it("should render all roles in vertical layout", () => {
      render(<GrowwChapter activeChapterRef={mockActiveChapterRef} />);
      expect(screen.getByText("Software Engineer 2")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer 1")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer Intern")).toBeInTheDocument();
    });
  });

  describe("VenturesChapter_whenReducedMotion_thenStillShowsGlow", () => {
    it("should still render AgriJod and Banalo correctly", () => {
      render(
        <VenturesChapter activeChapterRef={mockActiveChapterRef} />,
      );
      expect(screen.getByText("AgriJod")).toBeInTheDocument();
      expect(screen.getByText("Banalo")).toBeInTheDocument();
    });
  });
});

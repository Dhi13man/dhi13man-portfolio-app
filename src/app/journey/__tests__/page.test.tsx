import React from "react";
import { render, screen } from "@testing-library/react";
import JourneyPage from "../page";

// Mock JourneyShell since it needs GSAP/Lenis
vi.mock("@/components/journey/JourneyShell", () => ({
  JourneyShell: () => <div data-testid="journey-shell">Journey Shell</div>,
}));

describe("JourneyPage", () => {
  describe("JourneyPage_whenRendered_thenRendersShell", () => {
    it("should render the JourneyShell component", () => {
      render(<JourneyPage />);
      expect(screen.getByTestId("journey-shell")).toBeInTheDocument();
    });
  });
});

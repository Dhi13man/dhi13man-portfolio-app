import { renderHook, act } from "@testing-library/react";
import { useReducedMotion } from "../useReducedMotion";

describe("useReducedMotion", () => {
  let listeners: Map<string, Set<() => void>>;
  let motionMatches: boolean;

  beforeEach(() => {
    listeners = new Map();
    motionMatches = false;

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn((query: string) => ({
        matches: query === "(prefers-reduced-motion: reduce)" ? motionMatches : false,
        media: query,
        addEventListener: (_: string, cb: () => void) => {
          if (!listeners.has(query)) listeners.set(query, new Set());
          listeners.get(query)!.add(cb);
        },
        removeEventListener: (_: string, cb: () => void) => {
          listeners.get(query)?.delete(cb);
        },
        dispatchEvent: vi.fn(),
      })),
    });
  });

  describe("useReducedMotion_whenNoPreference_thenReturnsFalse", () => {
    it("should return false when user has no motion preference", () => {
      motionMatches = false;
      const { result } = renderHook(() => useReducedMotion());
      expect(result.current).toBe(false);
    });
  });

  describe("useReducedMotion_whenReducedMotion_thenReturnsTrue", () => {
    it("should return true when user prefers reduced motion", () => {
      motionMatches = true;
      const { result } = renderHook(() => useReducedMotion());
      expect(result.current).toBe(true);
    });
  });

  describe("useReducedMotion_whenPreferenceChanges_thenUpdates", () => {
    it("should update when system preference changes", () => {
      motionMatches = false;
      const { result } = renderHook(() => useReducedMotion());
      expect(result.current).toBe(false);

      // Simulate preference change
      motionMatches = true;
      // Trigger the change callback
      const changeListeners = listeners.get(
        "(prefers-reduced-motion: reduce)",
      );
      if (changeListeners) {
        act(() => {
          changeListeners.forEach((cb) => cb());
        });
      }

      expect(result.current).toBe(true);
    });
  });

  describe("useReducedMotion_whenUnmounted_thenCleansUpListener", () => {
    it("should remove event listener on unmount", () => {
      motionMatches = false;
      const { unmount } = renderHook(() => useReducedMotion());

      const changeListeners = listeners.get(
        "(prefers-reduced-motion: reduce)",
      );
      expect(changeListeners?.size).toBe(1);

      unmount();

      expect(changeListeners?.size).toBe(0);
    });
  });
});

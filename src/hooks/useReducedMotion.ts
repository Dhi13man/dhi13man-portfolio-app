"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getSnapshot(): boolean {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * GSAP animations are JS-driven (rAF + inline styles), so the CSS
 * `prefers-reduced-motion` rule in globals.css does NOT affect them.
 * This hook is the ONLY way to respect the user's motion preference
 * for GSAP-based animations.
 *
 * Uses useSyncExternalStore to avoid the setState-in-effect anti-pattern.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

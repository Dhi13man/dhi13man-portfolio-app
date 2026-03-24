"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface MetricCounterProps {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
}

export function MetricCounter({
  value,
  prefix,
  suffix,
  label,
}: MetricCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion || !numberRef.current) return;

      const proxy = { val: 0 };
      const snapTo = value >= 10 ? 1 : 0.1;

      gsap.to(proxy, {
        val: value,
        duration: 1.5,
        ease: "power1.inOut",
        snap: { val: snapTo },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = formatNumber(proxy.val, value);
          }
        },
      });
    },
    { scope: containerRef, dependencies: [value, reducedMotion] },
  );

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-1">
      <div className="flex items-baseline gap-0.5">
        {prefix && (
          <span className="text-20 font-display font-bold text-accent md:text-32">
            {prefix}
          </span>
        )}
        <span
          ref={numberRef}
          className="text-20 font-display font-bold text-accent md:text-32"
          aria-hidden="true"
        >
          {reducedMotion ? formatNumber(value, value) : "0"}
        </span>
        {suffix && (
          <span className="text-20 font-display font-bold text-accent md:text-32">
            {suffix}
          </span>
        )}
      </div>
      <span className="text-12 uppercase tracking-wide text-text-tertiary text-center">
        {label}
      </span>
      {/* Screen reader always sees the final value */}
      <span className="sr-only">
        {prefix}
        {formatNumber(value, value)}
        {suffix} {label}
      </span>
    </div>
  );
}

function formatNumber(current: number, target: number): string {
  if (target >= 1000) {
    return Math.round(current).toLocaleString("en-IN");
  }
  if (Number.isInteger(target)) {
    return Math.round(current).toString();
  }
  return current.toFixed(1);
}

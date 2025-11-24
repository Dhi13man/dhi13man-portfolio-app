import * as React from "react";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { Recommendation } from "@/types/recommendation";

export interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <Panel hoverable>
      <div className="space-y-4">
        {/* Quote */}
        <blockquote className="text-16 text-text-secondary italic leading-relaxed border-l-2 border-accent/50 pl-4 py-1">
          &ldquo;{recommendation.text}&rdquo;
        </blockquote>

        {/* Author info with link */}
        <div className="pt-2 flex items-center justify-between gap-2">
          <p className="text-14 font-semibold text-accent">
            — {recommendation.from}
          </p>
          {recommendation.links?.primary && (
            <Button asChild variant="ghost" size="sm">
              <Link
                href={recommendation.links.primary}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${recommendation.from}'s profile`}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Panel>
  );
}

import * as React from "react";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDateRange } from "@/lib/date";
import { ExternalLink } from "lucide-react";
import type { Award, Certification, TestScore } from "@/types/achievement";

export interface AwardCardProps {
  award: Award;
}

export function AwardCard({ award }: AwardCardProps) {
  return (
    <Panel hoverable>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-16 font-semibold text-text-primary">
                {award.title}
              </h3>
              {award.links?.primary && (
                <Button asChild variant="ghost" size="sm" className="shrink-0">
                  <Link
                    href={award.links.primary}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${award.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <time className="text-12 font-mono text-accent/60 shrink-0">
            {formatDateRange(award.startDate, award.endDate)}
          </time>
        </div>

        <p className="text-14 font-medium text-text-tertiary">{award.issuer}</p>
        <p className="text-14 text-text-secondary">{award.description}</p>

        {award.details && award.details.length > 0 && (
          <ul className="space-y-1 mt-2">
            {award.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-12 text-text-tertiary"
              >
                <span className="text-accent font-bold shrink-0 mt-0.5">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
}

export interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Panel hoverable>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-16 font-semibold text-text-primary">
                {certification.title}
              </h3>
              {certification.links?.primary && (
                <Button asChild variant="ghost" size="sm" className="shrink-0">
                  <Link
                    href={certification.links.primary}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${certification.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <time className="text-12 font-mono text-secondary/60 shrink-0">
            {formatDateRange(certification.startDate, certification.endDate)}
          </time>
        </div>

        <p className="text-14 font-medium text-text-tertiary">
          {certification.issuer}
        </p>
        <p className="text-14 text-text-secondary">
          {certification.description}
        </p>

        {certification.credentialId && (
          <p className="text-12 font-mono text-text-quaternary">
            Credential ID: {certification.credentialId}
          </p>
        )}

        {certification.details && certification.details.length > 0 && (
          <ul className="space-y-1 mt-2">
            {certification.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-12 text-text-tertiary"
              >
                <span className="text-accent font-bold shrink-0 mt-0.5">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
}

export interface TestScoreCardProps {
  testScore: TestScore;
}

export function TestScoreCard({ testScore }: TestScoreCardProps) {
  return (
    <Panel hoverable>
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-16 font-semibold text-text-primary">
                {testScore.name}
              </h3>
              {testScore.links?.primary && (
                <Button asChild variant="ghost" size="sm" className="shrink-0">
                  <Link
                    href={testScore.links.primary}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${testScore.name}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
          <time className="text-12 font-mono text-text-quaternary shrink-0">
            {formatDateRange(testScore.startDate, testScore.endDate)}
          </time>
        </div>

        <div className="inline-flex">
          <span className="text-24 font-bold text-accent px-3 py-1 bg-surface border border-border rounded-lg">
            {testScore.score}
          </span>
        </div>

        <p className="text-14 text-text-secondary">{testScore.description}</p>

        {testScore.details && testScore.details.length > 0 && (
          <ul className="space-y-1 mt-2">
            {testScore.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-12 text-text-tertiary"
              >
                <span className="text-accent font-bold shrink-0 mt-0.5">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Panel>
  );
}

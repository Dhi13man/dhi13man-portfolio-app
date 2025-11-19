import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section'
import { Panel } from '@/components/ui/panel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { recommendations } from '@/data/recommendations'
import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Recommendations - Dhiman Seal',
  description: 'Read testimonials and recommendations from clients, colleagues, and partners I have worked with.',
}

export default function RecommendationsPage() {
  return (
    <Section noDivider className="py-16">
      <SectionHeader>
        <SectionTitle>Recommendations</SectionTitle>
        <SectionDescription>
          Testimonials and endorsements from clients, colleagues, and partners who have worked with
          me.
        </SectionDescription>
      </SectionHeader>

      <div className="space-y-4 mt-8">
        {recommendations.map((recommendation, index) => (
          <Panel key={index} hoverable>
            <div className="space-y-3">
              {/* Quote */}
              <blockquote className="text-16 text-text-secondary italic leading-relaxed border-l-2 border-accent pl-4">
                {recommendation.text}
              </blockquote>

              {/* Author info with link */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <p className="text-14 font-semibold text-text-primary">
                  {recommendation.from}
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
        ))}
      </div>
    </Section>
  )
}

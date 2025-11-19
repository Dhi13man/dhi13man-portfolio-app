import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ExternalLink, Quote } from 'lucide-react'
import type { Recommendation } from '@/types'

interface RecommendationCardProps {
  recommendation: Recommendation
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <Card hoverable accentColor="recommendations">
      <CardHeader>
        <Quote className="w-8 h-8 text-recommendations opacity-50" />
      </CardHeader>

      <CardContent className="space-y-4">
        <blockquote className="text-base leading-relaxed text-muted-foreground italic">
          &ldquo;{recommendation.text}&rdquo;
        </blockquote>

        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />
          <cite className="text-sm font-semibold not-italic text-foreground">
            {recommendation.from}
          </cite>
          <div className="h-px flex-1 bg-border" />
        </div>
      </CardContent>

      {recommendation.links?.primary && (
        <CardFooter>
          <Button asChild size="sm" variant="secondary">
            <Link href={recommendation.links.primary} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Source
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

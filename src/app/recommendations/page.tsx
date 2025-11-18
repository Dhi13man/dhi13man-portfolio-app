import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RecommendationCard } from '@/components/domain/RecommendationCard'
import { recommendations } from '@/data/recommendations'

export const metadata = {
  title: 'Recommendations - Dhiman Seal',
  description: 'Read testimonials and recommendations from clients, colleagues, and partners I have worked with.',
}

export default function RecommendationsPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Recommendations</h1>
            <p className="text-lg text-muted-foreground">
              Testimonials and endorsements from clients, colleagues, and partners who have worked with me.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recommendation, index) => (
              <RecommendationCard key={index} recommendation={recommendation} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

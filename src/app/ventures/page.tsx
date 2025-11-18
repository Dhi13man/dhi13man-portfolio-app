import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { VentureCard } from '@/components/domain/VentureCard'
import { ventures } from '@/data/ventures'

export const metadata = {
  title: 'Ventures - Dhiman Seal',
  description: 'Explore my entrepreneurial journey through various startups and ventures I have founded and contributed to.',
}

export default function VenturesPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ventures</h1>
            <p className="text-lg text-muted-foreground">
              My entrepreneurial journey through founding and leading various startups and innovative ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {ventures.map((venture) => (
              <VentureCard key={venture.name} venture={venture} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

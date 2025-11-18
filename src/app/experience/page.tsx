import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { ExperienceCard } from '@/components/domain/ExperienceCard'
import { experiences } from '@/data/experiences'

export const metadata = {
  title: 'Experience - Dhiman Seal',
  description: 'Explore my professional journey and work experience across various companies and roles.',
}

export default function ExperiencePage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience</h1>
            <p className="text-lg text-muted-foreground">
              A journey through my professional career, showcasing the companies I&apos;ve worked with and the impact I&apos;ve made.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.name} experience={experience} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

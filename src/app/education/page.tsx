import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { EducationCard } from '@/components/domain/EducationCard'
import { education } from '@/data/education'

export const metadata = {
  title: 'Education - Dhiman Seal',
  description: 'Explore my educational background, academic achievements, and the institutions that shaped my learning journey.',
}

export default function EducationPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Education</h1>
            <p className="text-lg text-muted-foreground">
              My academic journey through premier institutions, from early education to advanced technical training.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {education.map((edu) => (
              <EducationCard key={edu.name} education={edu} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

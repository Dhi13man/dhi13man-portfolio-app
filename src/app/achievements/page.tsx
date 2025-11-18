import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { AwardCard, CertificationCard, TestScoreCard } from '@/components/domain/AchievementCard'
import { achievements } from '@/data/achievements'

export const metadata = {
  title: 'Achievements - Dhiman Seal',
  description: 'Explore my achievements, awards, certifications, and test scores from various competitions and programs.',
}

export default function AchievementsPage() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Achievements</h1>
            <p className="text-lg text-muted-foreground">
              A collection of awards, certifications, and test scores showcasing my continuous learning and excellence.
            </p>
          </div>

          {/* Honors and Awards */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Honors & Awards</h2>
              <p className="text-muted-foreground">
                Recognition for excellence in competitions, hackathons, and innovation challenges.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.honorsAndAwards.map((award, index) => (
                <AwardCard key={index} award={award} />
              ))}
            </div>
          </div>

          {/* Licenses and Certifications */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Licenses & Certifications</h2>
              <p className="text-muted-foreground">
                Professional certifications and specialized training in various technologies.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.licensesAndCertifications.map((cert, index) => (
                <CertificationCard key={index} certification={cert} />
              ))}
            </div>
          </div>

          {/* Test Scores */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">Test Scores</h2>
              <p className="text-muted-foreground">
                Performance in standardized tests and technical assessments.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.testScores.map((testScore, index) => (
                <TestScoreCard key={index} testScore={testScore} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

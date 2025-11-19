import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section'
import { AwardCard, CertificationCard, TestScoreCard } from '@/components/domain/AchievementCard'
import { achievements } from '@/data/achievements'

export const metadata = {
  title: 'Achievements - Dhiman Seal',
  description: 'Explore my achievements, awards, certifications, and test scores from various competitions and programs.',
}

export default function AchievementsPage() {
  return (
    <>
      <Section noDivider className="py-16">
        <SectionHeader>
          <SectionTitle>Achievements</SectionTitle>
          <SectionDescription>
            A collection of awards, certifications, and test scores showcasing my continuous learning
            and excellence.
          </SectionDescription>
        </SectionHeader>
      </Section>

      {/* Honors and Awards */}
      <Section>
        <div className="mb-6">
          <h2 className="text-24 font-semibold text-text-primary mb-2">Honors & Awards</h2>
          <p className="text-14 text-text-tertiary">
            Recognition for excellence in competitions, hackathons, and innovation challenges.
          </p>
        </div>
        <div className="space-y-3">
          {achievements.honorsAndAwards.map((award, index) => (
            <AwardCard key={index} award={award} />
          ))}
        </div>
      </Section>

      {/* Licenses and Certifications */}
      <Section>
        <div className="mb-6">
          <h2 className="text-24 font-semibold text-text-primary mb-2">
            Licenses & Certifications
          </h2>
          <p className="text-14 text-text-tertiary">
            Professional certifications and specialized training in various technologies.
          </p>
        </div>
        <div className="space-y-3">
          {achievements.licensesAndCertifications.map((cert, index) => (
            <CertificationCard key={index} certification={cert} />
          ))}
        </div>
      </Section>

      {/* Test Scores */}
      <Section>
        <div className="mb-6">
          <h2 className="text-24 font-semibold text-text-primary mb-2">Test Scores</h2>
          <p className="text-14 text-text-tertiary">
            Performance in standardized tests and technical assessments.
          </p>
        </div>
        <div className="space-y-3">
          {achievements.testScores.map((testScore, index) => (
            <TestScoreCard key={index} testScore={testScore} />
          ))}
        </div>
      </Section>
    </>
  )
}

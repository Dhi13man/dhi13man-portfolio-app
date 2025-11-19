import { Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/ui/section'
import { Panel } from '@/components/ui/panel'
import { achievements } from '@/data/achievements'
import { formatDateRange } from '@/lib/date'

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
            <Panel key={index} hoverable>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-16 font-semibold text-text-primary">{award.title}</h3>
                  <time className="text-12 font-mono text-text-quaternary shrink-0">
                    {formatDateRange(award.startDate, award.endDate)}
                  </time>
                </div>
                <p className="text-14 text-text-tertiary">{award.issuer}</p>
                <p className="text-14 text-text-secondary">{award.description}</p>
                {award.details && award.details.length > 0 && (
                  <ul className="space-y-1 mt-2">
                    {award.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
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
            <Panel key={index} hoverable>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-16 font-semibold text-text-primary">{cert.title}</h3>
                  <time className="text-12 font-mono text-text-quaternary shrink-0">
                    {formatDateRange(cert.startDate, cert.endDate)}
                  </time>
                </div>
                <p className="text-14 text-text-tertiary">{cert.issuer}</p>
                {cert.credentialId && (
                  <p className="text-12 font-mono text-text-quaternary">
                    Credential ID: {cert.credentialId}
                  </p>
                )}
                <p className="text-14 text-text-secondary">{cert.description}</p>
                {cert.details && cert.details.length > 0 && (
                  <ul className="space-y-1 mt-2">
                    {cert.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
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
            <Panel key={index} hoverable>
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-16 font-semibold text-text-primary">{testScore.name}</h3>
                    <p className="text-20 font-mono text-accent font-bold mt-1">
                      {testScore.score}
                    </p>
                  </div>
                  <time className="text-12 font-mono text-text-quaternary shrink-0">
                    {formatDateRange(testScore.startDate, testScore.endDate)}
                  </time>
                </div>
                <p className="text-14 text-text-secondary">{testScore.description}</p>
                {testScore.details && testScore.details.length > 0 && (
                  <ul className="space-y-1 mt-2">
                    {testScore.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
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
          ))}
        </div>
      </Section>
    </>
  )
}

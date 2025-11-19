import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Award, Certification, TestScore } from '@/types'
import { formatDateRange } from '@/lib/date'

interface AwardCardProps {
  award: Award
}

export function AwardCard({ award }: AwardCardProps) {
  return (
    <Card hoverable accentColor="achievements">
      <CardHeader>
        <CardTitle className="text-xl">{award.title}</CardTitle>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Badge variant="accent" size="sm">
            {award.issuer}
          </Badge>
          <time className="text-sm text-muted-foreground">
            {formatDateRange(award.startDate, award.endDate)}
          </time>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-base leading-relaxed text-muted-foreground">
          {award.description}
        </p>

        {award.details && award.details.length > 0 && (
          <ul className="space-y-2">
            {award.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-achievements font-bold mt-0.5 shrink-0">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

interface CertificationCardProps {
  certification: Certification & { credentialId?: string }
}

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <Card hoverable accentColor="achievements">
      <CardHeader>
        <CardTitle className="text-xl">{certification.title}</CardTitle>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Badge variant="accent" size="sm">
            {certification.issuer}
          </Badge>
          <time className="text-sm text-muted-foreground">
            {formatDateRange(certification.startDate, certification.endDate)}
          </time>
        </div>
        {certification.credentialId && (
          <p className="text-xs text-muted-foreground mt-2">
            Credential ID: {certification.credentialId}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-base leading-relaxed text-muted-foreground">
          {certification.description}
        </p>

        {certification.details && certification.details.length > 0 && (
          <ul className="space-y-2">
            {certification.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-achievements font-bold mt-0.5 shrink-0">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

interface TestScoreCardProps {
  testScore: TestScore
}

export function TestScoreCard({ testScore }: TestScoreCardProps) {
  return (
    <Card hoverable accentColor="achievements">
      <CardHeader>
        <CardTitle className="text-xl">{testScore.name}</CardTitle>
        <div className="flex flex-wrap items-center gap-3 mt-2">
          <Badge variant="info" size="sm">
            Score: {testScore.score}
          </Badge>
          <time className="text-sm text-muted-foreground">
            {formatDateRange(testScore.startDate, testScore.endDate)}
          </time>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-base leading-relaxed text-muted-foreground">
          {testScore.description}
        </p>

        {testScore.details && testScore.details.length > 0 && (
          <ul className="space-y-2">
            {testScore.details.map((detail, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="text-achievements font-bold mt-0.5 shrink-0">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

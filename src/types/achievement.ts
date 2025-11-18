import type { DateRange } from './common'

export interface Award extends DateRange {
  title: string
  issuer: string
  description: string
  details?: string[]
}

export interface Certification extends DateRange {
  title: string
  issuer: string
  description: string
  details?: string[]
  credentialId?: string
}

export interface TestScore extends DateRange {
  name: string
  score: string
  description: string
  details?: string[]
}

export interface Achievements {
  honorsAndAwards: Award[]
  licensesAndCertifications: Certification[]
  testScores: TestScore[]
}

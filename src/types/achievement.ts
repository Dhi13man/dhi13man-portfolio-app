import type { DateRange, Links } from './common'

export interface Award extends DateRange {
  title: string
  issuer: string
  description: string
  details?: string[]
  links?: Links
}

export interface Certification extends DateRange {
  title: string
  issuer: string
  description: string
  details?: string[]
  credentialId?: string
  links?: Links
}

export interface TestScore extends DateRange {
  name: string
  score: string
  description: string
  details?: string[]
  links?: Links
}

export interface Achievements {
  honorsAndAwards: Award[]
  licensesAndCertifications: Certification[]
  testScores: TestScore[]
}

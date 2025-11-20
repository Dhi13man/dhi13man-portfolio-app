/**
 * Highlight statistic to showcase impressive numbers
 */
export interface AboutHighlight {
  value: string;
  label: string;
}

/**
 * Expertise area with associated skills
 */
export interface AboutExpertise {
  area: string;
  skills: string[];
}

/**
 * Core value/principle with icon
 */
export interface AboutValue {
  number: number;
  title: string;
  description: string;
  iconName: "layers" | "git-branch" | "users" | "zap" | "target" | "code";
}

/**
 * Fun fact for personality
 */
export interface AboutFunFact {
  emoji: string;
  fact: string;
}

/**
 * Enhanced About section data model
 */
export interface About {
  /** Tagline displayed in hero section */
  tagline: string;
  /** Compelling opening statement */
  headline: string;
  /** Brief introduction paragraph */
  introduction: string;
  /** Key statistics/achievements */
  highlights: AboutHighlight[];
  /** Skill areas with technologies */
  expertise: AboutExpertise[];
  /** Core principles/values */
  values: AboutValue[];
  /** Personal touches for personality */
  funFacts: AboutFunFact[];
  /** Optional current focus area */
  currentFocus?: string;
}

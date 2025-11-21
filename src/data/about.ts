import type { About } from "@/types/about";

export const aboutData: About = {
  tagline: "Entrepreneur • Software Wizard • Open-Source Creator",

  headline: "Building the future, one elegant solution at a time",

  introduction:
    "Tech-obsessed engineer dedicated to simplifying lives through technology. Standing at the intersection of technical excellence and visionary leadership, with proven expertise in scalable systems and innovative solutions.",

  highlights: [
    {
      value: "6+",
      label: "Years Experience",
    },
    {
      value: "20+",
      label: "Open Source Packages",
    },
    {
      value: "1.5K+",
      label: "GitHub Stars",
    },
    {
      value: "50K+",
      label: "Monthly Downloads",
    },
  ],

  expertise: [
    {
      area: "Backend & Systems",
      skills: ["Go", "Python", "Node.js", "Java", "PostgreSQL", "Redis"],
    },
    {
      area: "Frontend & Mobile",
      skills: ["React", "Next.js", "Flutter", "TypeScript", "Tailwind CSS"],
    },
    {
      area: "Cloud & DevOps",
      skills: ["AWS", "GCP", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    },
    {
      area: "Specializations",
      skills: [
        "System Design",
        "Open Source",
        "Technical Leadership",
        "Microservices",
      ],
    },
  ],

  values: [
    {
      number: 1,
      title: "Scalable Solutions",
      description:
        "Architecting elegant solutions to complex societal challenges that grow with demand",
      iconName: "layers",
    },
    {
      number: 2,
      title: "Open Source Impact",
      description:
        "Advancing the technology landscape through strategic open-source contributions",
      iconName: "git-branch",
    },
    {
      number: 3,
      title: "Technical Leadership",
      description:
        "Leading high-performance teams in developing industry-transforming systems",
      iconName: "users",
    },
  ],

  funFacts: [
    {
      emoji: "☕",
      fact: "Powered by mass caffeine injection",
    },
    {
      emoji: "🎮",
      fact: "Debugs code and defeats bosses",
    },
    {
      emoji: "📚",
      fact: "Believes documentation is a love language",
    },
    {
      emoji: "🌍",
      fact: "Building for a global community",
    },
  ],
};

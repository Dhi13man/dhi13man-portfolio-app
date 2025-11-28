import type { About } from "@/types/about";

export const aboutData: About = {
  tagline: "Entrepreneur • Software Wizard • Open-Source Creator",

  headline: "Building the future, one elegant solution at a time",

  introduction:
    "Tech-obsessed engineer dedicated to simplifying lives through technology. Standing at the intersection of technical excellence and visionary leadership, with proven expertise in scalable systems and innovative solutions.",

  // Highlights are computed at build time from GitHub API and initiative counts
  highlights: [],

  expertise: [
    {
      area: "Backend & Systems",
      skills: ["Java", "Go", "Python", "Node.js", "PostgreSQL", "Redis"],
    },
    {
      area: "Frontend & Mobile",
      skills: ["Flutter", "React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      area: "Cloud & DevOps",
      skills: ["Kubernetes", "GCP", "AWS", "Docker", "CI/CD"],
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
      link: "/experiences",
    },
    {
      number: 2,
      title: "Open Source Impact",
      description:
        "Advancing the technology landscape through strategic open-source contributions",
      iconName: "git-branch",
      link: "/projects",
    },
    {
      number: 3,
      title: "Technical Leadership",
      description:
        "Leading high-performance teams in developing industry-transforming systems",
      iconName: "users",
      link: "/ventures",
    },
  ],
};

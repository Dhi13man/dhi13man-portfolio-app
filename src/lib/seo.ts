import type { Metadata } from "next";

export const SITE_URL = "https://www.dhimanseal.com";
export const SITE_IMAGE = `${SITE_URL}/assets/me.webp`;

type CanonicalPath = "/" | `/${string}/`;
type PageKey =
  | "home"
  | "journey"
  | "experience"
  | "projects"
  | "ventures"
  | "achievements"
  | "recommendations"
  | "education";

interface PageMetadataOptions {
  readonly title: string;
  readonly description: string;
  readonly path: CanonicalPath;
  readonly socialDescription?: string;
}

interface PageSeo {
  readonly path: CanonicalPath;
  readonly metadata: Metadata;
}

function definePageSeo({
  title,
  description,
  path,
  socialDescription = description,
}: PageMetadataOptions): PageSeo {
  const metadata = {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      title,
      description: socialDescription,
      siteName: "Dhiman Seal Portfolio",
      images: [
        {
          url: SITE_IMAGE,
          width: 800,
          height: 800,
          alt: "Dhiman Seal - Software Engineer & Entrepreneur",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: socialDescription,
      creator: "@Dhi13man",
      images: [SITE_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  } satisfies Metadata;

  return { path, metadata };
}

export const PAGE_SEO = {
  home: definePageSeo({
    title: "Dhiman Seal - Software Engineer & Entrepreneur",
    description:
      "Software engineer with 6+ years scaling production systems: payment infrastructure handling 300K+ daily transactions, real-time data serving 13M+ users. Open-source creator with packages used by 1.5K+ teams. National runner-up at ONDC Build for Bharat 2024. Multiple hackathon winner.",
    path: "/",
    socialDescription:
      "Software engineer scaling production systems: 300K+ daily transactions, 13M+ users served. Open-source packages used by 1.5K+ teams. ONDC Build for Bharat runner-up. Multiple hackathon winner.",
  }),
  journey: definePageSeo({
    title: "The Journey - Dhiman Seal",
    description:
      "4+ years building payment systems at Groww (300K+ daily transactions, 13M+ users). Startup founder (1 acquisition). Open-source creator (150+ GitHub stars). The full story.",
    path: "/journey/",
    socialDescription:
      "From college robotics to 300K+ daily UPI transactions. The career story of a builder.",
  }),
  experience: definePageSeo({
    title: "Experience - Dhiman Seal",
    description:
      "Explore my professional journey and work experience across various companies and roles.",
    path: "/experience/",
  }),
  projects: definePageSeo({
    title: "Projects - Dhiman Seal",
    description:
      "Explore my portfolio of open-source projects and technical work.",
    path: "/projects/",
  }),
  ventures: definePageSeo({
    title: "Ventures - Dhiman Seal",
    description:
      "Explore my entrepreneurial journey through various startups and ventures I have founded and contributed to.",
    path: "/ventures/",
  }),
  achievements: definePageSeo({
    title: "Achievements - Dhiman Seal",
    description:
      "Explore my achievements, awards, certifications, and test scores from various competitions and programs.",
    path: "/achievements/",
  }),
  recommendations: definePageSeo({
    title: "Recommendations - Dhiman Seal",
    description:
      "Read testimonials and recommendations from clients, colleagues, and partners I have worked with.",
    path: "/recommendations/",
  }),
  education: definePageSeo({
    title: "Education - Dhiman Seal",
    description:
      "Explore my educational background, academic achievements, and the institutions that shaped my learning journey.",
    path: "/education/",
  }),
} satisfies Readonly<Record<PageKey, PageSeo>>;

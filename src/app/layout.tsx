import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { SITE_IMAGE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  keywords: [
    "Dhiman Seal",
    "Software Engineer",
    "Open Source",
    "Entrepreneur",
    "Full Stack Developer",
    "Flutter",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Dhiman Seal" }],
  creator: "Dhiman Seal",
};

// JSON-LD Structured Data for AI Agents & SEO
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Dhiman Seal",
  alternateName: ["Dhi13man", "@Dhi13man"],
  url: `${SITE_URL}/`,
  image: SITE_IMAGE,
  jobTitle: "Software Engineer 2 - Full-Stack",
  description:
    "Software engineer with 6+ years building production systems at scale. Full-stack Software Engineer 2 at Rippling on the PEO (B2B HR Services) team, improving Underwriting and Workers' Compensation flows. Previously spent four years at Groww architecting payment infrastructure handling 300K+ daily transactions and real-time market data serving 13M+ users. Open-source creator with packages used by 1.5K+ development teams. National runner-up at ONDC Build for Bharat 2024.",
  email: "dhiman.seal@hotmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "National Institute of Technology Silchar",
    url: "https://www.nits.ac.in/",
  },
  worksFor: {
    "@type": "Organization",
    name: "Rippling",
    url: "https://www.rippling.com",
  },
  knowsAbout: [
    "Java",
    "Go",
    "Python",
    "Node.js",
    "Flutter",
    "React",
    "Next.js",
    "TypeScript",
    "Spring Boot",
    "Kubernetes",
    "System Design",
    "Microservices",
    "Distributed Systems",
    "Real-time Data Streaming",
    "Apache Kafka",
    "PostgreSQL",
    "Redis",
    "Payment Systems",
    "Open Source Development",
    "Cloud Architecture",
    "AWS",
    "GCP",
    "Docker",
    "CI/CD",
  ],
  sameAs: [
    "https://github.com/Dhi13man",
    "https://www.linkedin.com/in/dhi13man/",
    "https://medium.com/@dhi13man",
    "https://twitter.com/Dhi13man",
    "https://www.npmjs.com/~dhi13man",
    "https://pub.dev/publishers/dhimanseal.dev/packages",
  ],
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Deep Learning Specialization",
      credentialCategory: "certificate",
      recognizedBy: {
        "@type": "Organization",
        name: "deeplearning.ai",
      },
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Generative Adversarial Networks (GANs) Specialization",
      credentialCategory: "certificate",
      recognizedBy: {
        "@type": "Organization",
        name: "deeplearning.ai",
      },
    },
  ],
  award: [
    "National Runner-up - Build for Bharat by ONDC 2024",
    "Top 2% Globally - Product Strategy (Upraised Embark Program)",
    "1st Prize - KIIT-Fest 2019 (1 Lakh INR)",
    "1st Prize - E-Hackathon by ASTEC, Startup Assam 2021",
    "1st Prize - Robomania, NIT Silchar 2021",
    "1st Prize - RTU TEQIP-III Sponsored Poornima Hackathon 2021",
    "1st Prize - Technex Projectomania Innovation Challenge 2021",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Dhiman Seal Portfolio",
  alternateName: "Dhi13man Portfolio",
  url: `${SITE_URL}/`,
  description:
    "Professional portfolio showcasing 6+ years of software engineering excellence, including payment systems handling 300K+ daily transactions, real-time data serving 13M+ users, and open-source projects used by 1.5K+ teams.",
  author: {
    "@id": `${SITE_URL}/#person`,
  },
  inLanguage: "en-US",
};

// Site-wide identity schemas. Route-specific markup lives with its page.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload LCP hero image for faster initial render */}
        <link
          rel="preload"
          as="image"
          href="/assets/me.webp"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Skip to main content link for accessibility (WCAG 2.2 Level A) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-text-primary focus:rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
        <footer className="border-t border-border py-12 mt-16">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            {/* suppressHydrationWarning: Year is calculated at runtime with new Date().getFullYear()
                which may differ between server and client during year transitions */}
            <p
              className="text-14 text-text-quaternary"
              suppressHydrationWarning
            >
              &copy; {new Date().getFullYear()} Dhiman Seal. All rights
              reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

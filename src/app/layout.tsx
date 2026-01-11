import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";

const siteUrl = "https://dhimanseal.com";
const siteImage = `${siteUrl}/assets/me.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dhiman Seal - Software Engineer & Entrepreneur",
  description:
    "Software engineer with 6+ years scaling production systems: payment infrastructure handling 300K+ daily transactions, real-time data serving 13M+ users. Open-source creator with packages used by 1.5K+ teams. National runner-up at ONDC Build for Bharat 2024. Multiple hackathon winner.",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Dhiman Seal - Software Engineer & Entrepreneur",
    description:
      "Software engineer scaling production systems: 300K+ daily transactions, 13M+ users served. Open-source packages used by 1.5K+ teams. ONDC Build for Bharat runner-up. Multiple hackathon winner.",
    siteName: "Dhiman Seal Portfolio",
    images: [
      {
        url: siteImage,
        width: 800,
        height: 800,
        alt: "Dhiman Seal - Software Engineer & Entrepreneur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhiman Seal - Software Engineer & Entrepreneur",
    description:
      "Engineer scaling production systems: 300K+ daily transactions, 13M+ users. Open-source packages used by 1.5K+ teams. ONDC runner-up.",
    creator: "@Dhi13man",
    images: [siteImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for AI Agents & SEO
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}#person`,
  name: "Dhiman Seal",
  alternateName: ["Dhi13man", "@Dhi13man"],
  url: siteUrl,
  image: siteImage,
  jobTitle: "Software Engineer 2 - Backend",
  description:
    "Software engineer with 6+ years building production systems at scale. Currently architecting payment infrastructure handling 300K+ daily transactions and real-time market data serving 13M+ users. Open-source creator with packages used by 1.5K+ development teams. National runner-up at ONDC Build for Bharat 2024.",
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
    name: "Groww",
    url: "https://groww.in",
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
  url: siteUrl,
  description:
    "Professional portfolio showcasing 6+ years of software engineering excellence, including payment systems handling 300K+ daily transactions, real-time data serving 13M+ users, and open-source projects used by 1.5K+ teams.",
  author: {
    "@type": "Person",
    name: "Dhiman Seal",
  },
  inLanguage: "en-US",
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@id": `${siteUrl}#person`,
  },
  url: siteUrl,
  name: "Dhiman Seal - Software Engineer & Entrepreneur",
  description:
    "Software engineer with 6+ years at scale: payment systems handling 300K+ daily transactions, real-time infrastructure serving 13M+ users, open-source packages used by 1.5K+ teams. ONDC Build for Bharat runner-up.",
  dateModified: new Date().toISOString(),
};

// Combine all schemas using @graph for optimal AI parsing
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema, profilePageSchema],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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

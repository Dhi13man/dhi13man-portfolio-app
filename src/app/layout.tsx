import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";

const siteUrl = "https://dhimanseal.com";
const siteImage = `${siteUrl}/assets/me.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dhiman Seal - Software Engineer & Entrepreneur",
  description:
    "Tech-obsessed engineer dedicated to simplifying lives through technology. Open-source creator, entrepreneur, and software wizard.",
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
      "Tech-obsessed engineer dedicated to simplifying lives through technology. Open-source creator, entrepreneur, and software wizard.",
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
      "Tech-obsessed engineer dedicated to simplifying lives through technology.",
    creator: "@Dhi13man",
    images: [siteImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data for SEO
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dhiman Seal",
  alternateName: "Dhi13man",
  url: siteUrl,
  image: siteImage,
  jobTitle: "Software Engineer & Entrepreneur",
  description:
    "Tech-obsessed engineer dedicated to simplifying lives through technology. Open-source creator, entrepreneur, and software wizard.",
  email: "dhiman.seal@hotmail.com",
  sameAs: [
    "https://github.com/Dhi13man",
    "https://www.linkedin.com/in/dhi13man/",
    "https://medium.com/@dhi13man",
  ],
  knowsAbout: [
    "Java",
    "Go",
    "Python",
    "Node.js",
    "Flutter",
    "React",
    "Next.js",
    "TypeScript",
    "Kubernetes",
    "System Design",
    "Microservices",
    "Open Source",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* JSON-LD Structured Data for SEO */}
        <Script
          id="json-ld-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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

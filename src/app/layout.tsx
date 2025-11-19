import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Header } from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'Dhiman Seal - Software Engineer & Entrepreneur',
  description:
    'Tech-obsessed engineer dedicated to simplifying lives through technology. Open-source creator, entrepreneur, and software wizard.',
  keywords: [
    'Dhiman Seal',
    'Software Engineer',
    'Open Source',
    'Entrepreneur',
    'Full Stack Developer',
    'Flutter',
    'React',
    'Next.js',
  ],
  authors: [{ name: 'Dhiman Seal' }],
  creator: 'Dhiman Seal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Dhiman Seal - Software Engineer & Entrepreneur',
    description:
      'Tech-obsessed engineer dedicated to simplifying lives through technology. Open-source creator, entrepreneur, and software wizard.',
    siteName: 'Dhiman Seal Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhiman Seal - Software Engineer & Entrepreneur',
    description:
      'Tech-obsessed engineer dedicated to simplifying lives through technology.',
    creator: '@Dhi13man',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Skip to main content link for accessibility (WCAG 2.2 Level A) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="border-t border-border py-12 mt-16">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <p className="text-14 text-text-quaternary" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} Dhiman Seal. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}

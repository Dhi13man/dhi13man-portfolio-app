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
      <body className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <footer className="border-t border-border py-8 mt-20">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Dhiman Seal. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}

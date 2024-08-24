import '@/styles/globals.css'
import { Metadata } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  metadataBase: new URL('https://lashpic.vercel.app/'),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@kyuotaka',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-white font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <div className="relative flex max-w-screen-2xl flex-col">
          <SiteHeader />
          <main className="container mx-auto px-4 py-2">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

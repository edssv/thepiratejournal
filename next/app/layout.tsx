import type { Metadata, Viewport } from 'next';

import '@/styles/globals.css';

import { siteConfig } from '@/config/site';
import { fontSans, robotoMono } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import Providers from './providers';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ['Game articles', 'Articles', 'Game'],
  authors: [
    {
      name: 'Eduard Sysoev',
      url: 'https://vk.com/sysoeev'
    }
  ],
  creator: 'Eduard Sysoev',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`]
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  verification: {
    yandex: '7c4cbf983a08cef8'
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html suppressHydrationWarning lang='en'>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable, robotoMono.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

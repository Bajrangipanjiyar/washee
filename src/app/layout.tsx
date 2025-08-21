import type { Metadata } from 'next';
import './globals.css';
import { CustomerAuthProvider } from '@/context/customer-auth-context';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

const siteUrl = 'https://washee-online.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Washee - Premium Car Wash at Your Doorstep',
    template: `%s | Washee`,
  },
  description: 'Premium doorstep car wash service in Guwahati. Fast, affordable, and hassle-free booking for hatchback, SUV, and luxury cars. Monthly and one-time plans available.',
  keywords: ['car wash', 'doorstep car wash', 'Guwahati', 'car cleaning', 'Washee', 'online car wash booking'],
  openGraph: {
    title: 'Washee - Premium Car Wash at Your Doorstep',
    description: 'The best and most convenient car wash service in Guwahati, right at your doorstep.',
    url: siteUrl,
    siteName: 'Washee',
    images: [
      {
        url: `${siteUrl}/og-image.png`, // Update with your actual OG image path
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Washee - Doorstep Car Wash',
    description: 'Premium car wash at your door. Hassle-free booking and professional service.',
     images: [`${siteUrl}/og-image.png`], // Update with your actual OG image path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen bg-background flex flex-col">
        <CustomerAuthProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </CustomerAuthProvider>
      </body>
    </html>
  );
}

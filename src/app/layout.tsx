
import type { Metadata } from 'next';
import { PT_Sans } from 'next/font/google';
import './globals.css';
import { CustomerAuthProvider } from '@/context/customer-auth-context';
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
  display: 'swap',
});

const siteUrl = 'https://washee.in';

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
    <html lang="en" className={`${ptSans.variable}`} suppressHydrationWarning>
      <head />
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

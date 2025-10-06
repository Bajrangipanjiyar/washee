
import type { Metadata } from 'next';
import Link from 'next/link';
import '../globals.css'; // Import global styles here

export const metadata: Metadata = {
    title: 'Washee News',
    description: 'The latest news, articles, and updates from Washee.',
};

function NewsHeader() {
    return (
        <header className="sticky top-0 z-50 w-full bg-black">
            <div className="container flex h-16 items-center justify-center">
                <Link href="/news" className="flex items-center space-x-2">
                    <span className="font-bold font-headline text-2xl text-blue-500">Washee News</span>
                </Link>
            </div>
        </header>
    );
}

function NewsFooter() {
    return (
        <footer className="border-t bg-secondary">
            <div className="container py-6 text-center text-sm text-muted-foreground">
                <p>&copy; 2024 Washee News. All rights reserved.</p>
                <p className="mt-1">
                    Part of the <Link href="/" className="font-semibold text-primary hover:underline">Washee</Link> family.
                </p>
            </div>
        </footer>
    );
}


export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // This is a completely separate layout for the /news route
    // It does not inherit from the root layout's structure with Navbar/Footer
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-slate-50 flex flex-col">
        <NewsHeader />
        <main className="flex-grow">
            {children}
        </main>
        <NewsFooter />
      </body>
    </html>
  );
}

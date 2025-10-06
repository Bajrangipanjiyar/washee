
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Washee News',
    description: 'The latest news, articles, and updates from Washee.',
};

function NewsHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center">
                <Link href="/news" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold font-headline text-xl">Washee News</span>
                </Link>
                <div className="flex-grow" />
                <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary">
                    Back to Washee
                </Link>
            </div>
        </header>
    );
}

function NewsFooter() {
    return (
        <footer className="border-t bg-secondary">
            <div className="container py-6 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Washee News. All rights reserved.</p>
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
    <div className="min-h-screen flex flex-col">
        <NewsHeader />
        <main className="flex-grow bg-slate-50">
            {children}
        </main>
        <NewsFooter />
    </div>
  );
}


import Link from 'next/link';
import { Search } from 'lucide-react';

function NewsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/news" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-primary">Washee News</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/news" className="transition-colors hover:text-primary">Home</Link>
          <Link href="/news/about" className="transition-colors hover:text-primary">About Us</Link>
          <Link href="/news/contact" className="transition-colors hover:text-primary">Contact Us</Link>
        </nav>
        <div className="flex items-center gap-4">
           <Search className="h-5 w-5 text-muted-foreground" />
           <button className="md:hidden">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
           </button>
        </div>
      </div>
    </header>
  );
}

function NewsFooter() {
    return (
      <footer className="border-t bg-secondary">
        <div className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-lg mb-2">Washee News</h3>
                    <p className="text-sm text-muted-foreground">Your daily source of car care tips, industry news, and local updates.</p>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/news/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                        <li><Link href="/news/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                        <li><Link href="/" className="text-muted-foreground hover:text-primary">Back to Car Wash</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/news/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                        <li><Link href="/news/disclaimer" className="text-muted-foreground hover:text-primary">Disclaimer</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Follow Us</h3>
                    <p className="text-sm text-muted-foreground">Stay connected with us for the latest updates.</p>
                </div>
            </div>
            <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
              <p>&copy; 2024 Washee News. All rights reserved.</p>
            </div>
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
    <div className="min-h-screen flex flex-col bg-background">
        <NewsHeader />
        <main className="flex-grow">
            {children}
        </main>
        <NewsFooter />
    </div>
  );
}


import Link from 'next/link';
import { Facebook, Twitter, Youtube, Search, Menu, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navCategories = [
    { name: 'HOME', href: '/news' },
    { name: 'WORLD', href: '#' },
    { name: 'BUSINESS', href: '#' },
    { name: 'LIFESTYLE', href: '#' },
    { name: 'DESIGN & HOME', href: '#' },
    { name: 'MAGAZINE', href: '#' },
];

function NewsHeader() {
  return (
    <header className="bg-white text-black sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto px-4">
        {/* Top bar with Logo and Icons */}
        <div className="flex justify-between items-center py-4">
          <div className="flex-1 md:flex-none">
            <Link href="/news" className="text-3xl font-extrabold tracking-tight">
              Washee <span className="text-news-accent">News</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Search className="h-6 w-6 text-gray-600 cursor-pointer hover:text-news-accent" />
            <Button variant="outline" size="sm">Sign In</Button>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <Search className="h-6 w-6 text-gray-600" />
            <Menu className="h-6 w-6 text-gray-600" />
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex justify-center items-center border-t border-b">
          <ul className="flex items-center space-x-8 py-3">
            {navCategories.map(cat => (
              <li key={cat.name}>
                <Link href={cat.href} className="text-sm font-semibold tracking-wider uppercase text-gray-700 hover:text-news-accent transition-colors duration-300">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}


function NewsFooter() {
    return (
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 py-12 text-center">
            <h2 className="text-2xl font-bold">
                Washee <span className="text-news-accent">News</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm text-gray-400">
                Washee News is your source for news, entertainment, and lifestyle updates. We provide you with the latest breaking news and videos straight from the source.
            </p>
            <div className="flex justify-center space-x-6 mt-6">
                <Link href="#" className="text-gray-400 hover:text-white"><Facebook /></Link>
                <Link href="#" className="text-gray-400 hover:text-white"><Instagram /></Link>
                <Link href="#" className="text-gray-400 hover:text-white"><Twitter /></Link>
            </div>
             <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                <p>&copy; 2025 Washee News. All Rights Reserved.</p>
                <p className="mt-2">For inquiries, contact us at: <a href="mailto:contact@washeenews.com" className="underline hover:text-news-accent">contact@washeenews.com</a></p>
                <div className="flex justify-center items-center gap-4 mt-4 text-xs">
                    <Link href="/news/about" className="hover:underline">About</Link>
                    <Link href="/news/contact" className="hover:underline">Contact</Link>
                    <Link href="/news/privacy-policy" className="hover:underline">Privacy Policy</Link>
                    <Link href="/news/disclaimer" className="hover:underline">Disclaimer</Link>
                </div>
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
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
        <NewsHeader />
        <main className="flex-grow">
            {children}
        </main>
        <NewsFooter />
    </div>
  );
}

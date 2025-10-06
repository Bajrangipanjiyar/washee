
import Link from 'next/link';
import { Search } from 'lucide-react';

function NewsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex-1"></div>
        <Link href="/news" className="flex items-center space-x-2 flex-1 justify-center">
          <span className="font-bold text-blue-400 text-3xl">Washee News</span>
        </Link>
        <div className="flex-1 flex justify-end">
           <Search className="h-6 w-6 text-white" />
        </div>
      </div>
    </header>
  );
}

function NewsFooter() {
    return (
      <footer className="border-t bg-gray-900 text-white">
        <div className="container py-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Washee News. All rights reserved.</p>
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
        <main className="flex-grow">
            {children}
        </main>
        <NewsFooter />
    </div>
  );
}

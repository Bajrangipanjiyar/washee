import Link from "next/link";
import { Search } from 'lucide-react';

function NewsHeader() {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex-1"></div>
        <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-blue-400">Washee News</h1>
        </div>
        <div className="flex-1 flex justify-end">
          <Search className="h-6 w-6 text-gray-400" />
        </div>
      </div>
    </header>
  );
}

function NewsFooter() {
    return (
        <footer className="bg-gray-100 border-t mt-auto">
            <div className="container mx-auto py-4 text-center text-sm text-gray-600">
                <p>&copy; 2024 Washee News. All rights reserved.</p>
            </div>
        </footer>
    )
}


export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
        <NewsHeader />
        <main className="flex-grow">
            {children}
        </main>
        <NewsFooter />
    </div>
  );
}

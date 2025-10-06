
import type { Metadata } from 'next';
import '../globals.css'; // Import global styles here

export const metadata: Metadata = {
    title: 'Washee News',
    description: 'The latest news, articles, and updates from Washee.',
};

export default function NewsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
        <main className="flex-grow">
            {children}
        </main>
    </div>
  );
}

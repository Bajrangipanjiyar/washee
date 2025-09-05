
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/blogPosts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Washee Car Wash Blogs',
    description: 'Find answers to all your questions about Washee car wash services in Guwahati. Explore our blogs for tips, guides, and detailed information.',
    keywords: ['car wash blog', 'Guwahati car care', 'Washee FAQ', 'car maintenance tips'],
};

export default function BlogListPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Washee Blogs</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your Ultimate Guide to Car Care in Guwahati</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`} className="block group">
            <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <CardContent className="p-6 flex-grow flex flex-col">
                <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">{post.title}</CardTitle>
                <CardDescription className="mt-2 text-sm text-muted-foreground flex-grow">{post.description}</CardDescription>
                <div className="mt-4 text-sm font-semibold text-primary">
                    Read More →
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

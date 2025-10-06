
import Link from 'next/link';
import { newsArticles } from '@/lib/newsArticles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Washee News & Car Care Tips',
    description: 'Find answers to all your questions about Washee car wash services in Guwahati. Explore our articles for tips, guides, and detailed information.',
    keywords: ['car wash blog', 'Guwahati car care', 'Washee FAQ', 'car maintenance tips', 'car cleaning', 'doorstep car wash', 'car wash news'],
};

export default function NewsListPage() {
  const featuredArticle = newsArticles[0];
  const otherArticles = newsArticles.slice(1);

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Washee News</h1>
        <p className="mt-2 text-lg text-muted-foreground">Your Ultimate Guide to Car Care in Guwahati</p>
      </div>
      
      {/* Featured Article */}
      {featuredArticle && (
        <div className="mb-16">
            <Link href={`/news/${featuredArticle.slug}`} className="block group">
                <Card className="grid md:grid-cols-2 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-64 md:h-auto">
                        <Image
                            src={`https://picsum.photos/seed/${featuredArticle.imageHint.replace(/\s+/g, '-')}/800/600`}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center p-8">
                        <CardHeader className="p-0">
                            <CardDescription className="text-sm text-primary font-semibold mb-2">Featured Article</CardDescription>
                            <CardTitle className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors">{featuredArticle.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-4">
                            <CardDescription className="text-base text-muted-foreground">{featuredArticle.description}</CardDescription>
                            <div className="mt-6 text-sm font-semibold text-primary">
                                Read More →
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </Link>
        </div>
      )}

      {/* Other Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherArticles.map((post) => (
          <Link key={post.slug} href={`/news/${post.slug}`} className="block group">
            <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="relative h-48 w-full">
                <Image
                    src={`https://picsum.photos/seed/${post.imageHint.replace(/\s+/g, '-')}/600/400`}
                    alt={post.title}
                    fill
                    className="object-cover"
                />
              </div>
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

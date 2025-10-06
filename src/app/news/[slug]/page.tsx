
import { newsArticles } from '@/lib/newsArticles';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = newsArticles.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Washee',
      description: 'The article you are looking for does not exist.',
    };
  }

  const siteUrl = 'https://washee.in';
  const postImage = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: `${post.title} | Washee News`,
    description: post.seo_description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.seo_description,
      images: [postImage],
      url: `${siteUrl}/news/${post.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.seo_description,
      images: [postImage],
    },
  };
}

export async function generateStaticParams() {
  return newsArticles.map((post) => ({
    slug: post.slug,
  }));
}

export default function NewsArticlePage({ params }: Props) {
  const { slug } = params;
  const post = newsArticles.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <article>
        <header className="mb-8 text-center">
            <CardTitle className="text-3xl md:text-5xl font-bold font-headline mb-4">{post.title}</CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground">{post.description}</CardDescription>
        </header>

         <div className="relative h-80 rounded-lg overflow-hidden mb-8">
            <Image
                src={`https://picsum.photos/seed/${post.imageHint.replace(/\s+/g, '-')}/1200/800`}
                alt={post.title}
                fill
                className="object-cover"
            />
        </div>

        <Card>
            <CardContent className="p-6 md:p-8">
                <div
                    className="prose prose-lg max-w-none text-muted-foreground space-y-4 [&_h2]:text-foreground [&_h3]:text-foreground [&_strong]:text-foreground [&_table]:w-full [&_table]:overflow-x-auto [&_table]:block"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                />
            </CardContent>
        </Card>
      </article>
    </div>
  );
}

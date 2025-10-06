

import { blogPosts } from '@/lib/blogPosts';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata, ResolvingMetadata } from 'next';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Washee',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  const siteUrl = 'https://washee.in';
  const postImage = `${siteUrl}/api/og?title=${encodeURIComponent(post.title)}`;

  return {
    title: `${post.title} | Washee Blogs`,
    description: post.seo_description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.seo_description,
      images: [postImage],
      url: `${siteUrl}/blogs/${post.slug}`,
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
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: Props) {
  const { slug } = params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
        <Navbar />
        <main className="flex-grow">
            <div className="container py-12 max-w-4xl mx-auto">
              <article>
                <header className="mb-8">
                  <CardTitle className="text-3xl md:text-4xl font-bold font-headline mb-2">{post.title}</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">{post.description}</CardDescription>
                </header>

                <Card>
                    <CardContent className="p-6">
                        <div
                            className="prose prose-lg max-w-none text-muted-foreground space-y-4 [&_table]:w-full [&_table]:overflow-x-auto [&_table]:block"
                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                        />
                    </CardContent>
                </Card>
              </article>
            </div>
        </main>
        <Footer />
    </>
  );
}

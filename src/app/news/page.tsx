
import Link from 'next/link';
import { newsArticles } from '@/lib/newsArticles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Facebook, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Washee News - Your Source for News, Entertainment, and Lifestyle',
    description: 'The latest breaking news, entertainment, and lifestyle updates from Washee News. Your daily source for what\'s happening in the world.',
    keywords: ['news', 'lifestyle', 'entertainment', 'breaking news', 'design', 'home', 'business'],
};

const SocialFollowCard = ({ icon, platform, count, cta, bgColor, href }: { icon: React.ReactNode; platform: string; count: string; cta: string; bgColor: string; href: string; }) => (
    <Link href={href} target="_blank" rel="noopener noreferrer" className={`flex-1 ${bgColor} text-white p-4 rounded-lg flex items-center justify-between transition-transform hover:scale-105`}>
        <div className="flex items-center space-x-3">
            {icon}
            <div>
                <p className="font-bold text-lg">{count}</p>
                <p className="text-sm opacity-90">{platform}</p>
            </div>
        </div>
        <p className="font-semibold text-sm">{cta} &rarr;</p>
    </Link>
);


export default function NewsListPage() {
  const featuredArticle = newsArticles.find(a => a.slug === 'increase-resale-value-with-washee');
  const secondaryFeatured = newsArticles.find(a => a.slug === 'washee-deep-seat-shampooing');
  const tertiaryFeatured = newsArticles.find(a => a.slug === 'how-to-book-car-wash-in-guwahati');
  
  const mainGridArticles = newsArticles.filter(a => ![featuredArticle?.slug, secondaryFeatured?.slug, tertiaryFeatured?.slug].includes(a.slug)).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Featured Content Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Story */}
        {featuredArticle && (
            <div className="lg:col-span-2 relative rounded-lg overflow-hidden group h-[500px]">
                 <Image
                    src={`https://picsum.photos/seed/${featuredArticle.imageHint.replace(/\s+/g, '-')}/1200/800`}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <span className="text-sm font-semibold bg-news-accent px-2 py-1 rounded-sm">LIFESTYLE</span>
                    <h1 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight">
                        <Link href={`/news/${featuredArticle.slug}`} className="hover:underline">
                            {featuredArticle.title}
                        </Link>
                    </h1>
                    <p className="mt-2 text-gray-300 hidden md:block">{featuredArticle.description}</p>
                </div>
            </div>
        )}
        
        {/* Secondary Stories */}
        <div className="flex flex-col space-y-6">
            {secondaryFeatured && (
                 <div className="relative rounded-lg overflow-hidden group h-full">
                    <Image
                        src={`https://picsum.photos/seed/${secondaryFeatured.imageHint.replace(/\s+/g, '-')}/600/400`}
                        alt={secondaryFeatured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                         <span className="text-xs font-semibold bg-news-accent px-2 py-1 rounded-sm">DESIGN & HOME</span>
                         <h2 className="text-lg font-bold mt-1 leading-tight">
                            <Link href={`/news/${secondaryFeatured.slug}`} className="hover:underline">
                                {secondaryFeatured.title}
                            </Link>
                        </h2>
                    </div>
                </div>
            )}
             {tertiaryFeatured && (
                 <div className="relative rounded-lg overflow-hidden group h-full">
                    <Image
                        src={`https://picsum.photos/seed/${tertiaryFeatured.imageHint.replace(/\s+/g, '-')}/600/400`}
                        alt={tertiaryFeatured.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 p-4 text-white">
                         <span className="text-xs font-semibold bg-news-accent px-2 py-1 rounded-sm">GUIDES</span>
                         <h2 className="text-lg font-bold mt-1 leading-tight">
                            <Link href={`/news/${tertiaryFeatured.slug}`} className="hover:underline">
                                {tertiaryFeatured.title}
                            </Link>
                        </h2>
                    </div>
                </div>
            )}
        </div>
      </div>
      
      {/* Social Engagement Bar */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 my-12">
        <SocialFollowCard icon={<Facebook className="h-8 w-8"/>} platform="Followers" count="34.8K" cta="Follow" bgColor="bg-blue-600" href="#"/>
        <SocialFollowCard icon={<Twitter className="h-8 w-8"/>} platform="Followers" count="5.8K" cta="Follow" bgColor="bg-cyan-500" href="#"/>
        <SocialFollowCard icon={<Youtube className="h-8 w-8"/>} platform="Subscribers" count="33,400" cta="Subscribe" bgColor="bg-red-600" href="#"/>
      </div>
      
      {/* Main Content Grid */}
      <h2 className="text-3xl font-bold font-headline mb-6 border-b-2 border-news-accent pb-2 inline-block">Latest Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {mainGridArticles.map((post) => (
          <div key={post.slug} className="group flex flex-col">
            <div className="relative h-48 w-full rounded-lg overflow-hidden mb-4">
                <Image
                    src={`https://picsum.photos/seed/${post.imageHint.replace(/\s+/g, '-')}/600/400`}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div>
                 <p className="text-xs font-semibold text-news-accent uppercase tracking-wider">{post.category || 'News'}</p>
                 <h3 className="text-xl font-bold mt-1 group-hover:text-news-accent transition-colors">
                    <Link href={`/news/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-gray-500 mt-2">{post.description}</p>
                <p className="text-xs text-gray-400 mt-2">{post.date || "July 25, 2024"}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

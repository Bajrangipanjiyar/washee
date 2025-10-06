
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Washee News',
    description: 'Learn about the team and mission behind Washee News, your trusted source for car care tips and industry updates.',
};

export default function AboutNewsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader className="text-center border-b pb-6">
                    <CardTitle className="text-4xl font-extrabold">About Washee News</CardTitle>
                    <CardDescription className="text-lg text-gray-600 mt-2">
                        Your Trusted Source for News, Entertainment, and Lifestyle
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p>Welcome to Washee News, your premier destination for the latest in news, entertainment, and lifestyle updates. Our mission is to inform, inspire, and engage our readers with high-quality, well-researched, and thought-provoking content.</p>
                        
                        <p>While our name is shared with Washee's top-tier doorstep car wash services, our focus here is on delivering compelling stories that matter to you. We believe that staying informed and inspired is a key part of a modern, well-rounded life.</p>
                        
                        <h3>Our Mission</h3>
                        <p>Our mission is to be the most reliable and accessible resource for a wide range of topics. We strive to create content that is not only informative but also enjoyable to read, helping you make sense of the world around you and discover new passions.</p>

                        <h3>What We Cover</h3>
                        <ul>
                            <li><strong>World News:</strong> The latest developments from around the globe.</li>
                            <li><strong>Business & Technology:</strong> In-depth analysis of market trends and tech innovations.</li>
                            <li><strong>Lifestyle & Culture:</strong> From fashion and travel to wellness and art.</li>
                            <li><strong>Design & Home:</strong> Inspiring ideas for modern living spaces.</li>
                            <li><strong>Magazine Features:</strong> Long-form articles and exclusive interviews.</li>
                        </ul>

                        <p>Thank you for visiting Washee News. We hope you find our content valuable and we look forward to being a part of your daily read.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

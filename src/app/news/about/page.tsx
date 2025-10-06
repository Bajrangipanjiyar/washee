
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | Washee News',
    description: 'Learn about the team and mission behind Washee News, your trusted source for car care tips and industry updates.',
};

export default function AboutNewsPage() {
    return (
        <div className="container py-12 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">About Washee News</CardTitle>
                    <CardDescription>
                        Your Trusted Source for Car Care Knowledge
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-muted-foreground">
                        <p>Welcome to Washee News, the content and media division of Washee. While our parent company focuses on providing top-tier doorstep car wash services, our mission here is to inform, educate, and engage with car enthusiasts and owners everywhere.</p>
                        <p>We believe that a well-maintained car is a source of pride and joy. Our goal is to empower you with the knowledge to make the best decisions for your vehicle. From simple cleaning hacks and DIY tips to in-depth guides on vehicle maintenance and the latest industry trends, we cover it all.</p>
                        
                        <h3 className="font-bold text-foreground pt-4">Our Mission</h3>
                        <p>Our mission is to be the most reliable and accessible resource for car care information. We strive to create high-quality, well-researched, and easy-to-understand content that helps you keep your car in pristine condition.</p>

                        <h3 className="font-bold text-foreground pt-4">What We Cover</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><strong>Car Care Tips:</strong> Practical advice for maintaining your vehicle's interior and exterior.</li>
                            <li><strong>Industry News:</strong> The latest developments in the automotive world.</li>
                            <li><strong>Local Focus:</strong> News and events relevant to car owners in Guwahati and beyond.</li>
                            <li><strong>Product Reviews:</strong> Unbiased reviews of car care products and accessories.</li>
                        </ul>

                        <p>Thank you for visiting Washee News. We hope you find our content valuable and we look forward to helping you on your car care journey.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

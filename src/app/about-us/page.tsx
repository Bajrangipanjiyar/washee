

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Washee, our mission to provide convenient and high-quality doorstep car wash services, and the team behind our success.',
};

export default function AboutUsPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">About Us</CardTitle>
                    <CardDescription>
                        Welcome to Washee – Your Doorstep Car Care Partner.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-muted-foreground">
                        <p>Washee is not just another car wash service, it is a promise of convenience, quality, and trust. We understand that in today’s fast-paced life, finding time to maintain your car can be difficult. That’s why we bring professional car wash services right to your doorstep – saving you time, effort, and hassle.</p>
                        <p>The idea of Washee was born with a simple mission:👉 To make car cleaning effortless and accessible for everyone.</p>
                        
                        <h3 className="font-bold text-foreground pt-4">Our Founders</h3>
                        <p><strong>Dharmaraj Ram (Founder)</strong> – The visionary behind Washee, whose passion for innovation and service excellence laid the foundation of this venture. His belief is simple – a clean car reflects a clear lifestyle.</p>
                        <p><strong>Bajrangi Panjiyar (CEO)</strong> – Leading Washee with dedication and strategy, he ensures that our operations are smooth, customer-centric, and future-ready. Under his leadership, Washee is growing as a reliable name in the doorstep car wash industry.</p>

                        <h3 className="font-bold text-foreground pt-4">Our Commitment</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Convenience at your door – Book a wash anytime, anywhere.</li>
                            <li>Professional care – Trained staff with modern techniques.</li>
                            <li>Affordable plans – From one-time washes to easy subscriptions.</li>
                            <li>Trust &amp; transparency – No hidden charges, no compromise on quality.</li>
                        </ul>

                        <p>At Washee, we believe that a car is not just a vehicle, it’s a partner in your journey. Keeping it clean should never be a burden. With us, car care becomes simple, reliable, and stress-free.</p>
                        <p className="font-bold text-center pt-4">🌟 Washee – Because your car deserves the best care.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

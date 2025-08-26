
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Star, MapPin, Car } from 'lucide-react';

const features = [
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: 'Doorstep Service – Absolutely Free Visit 🚗💦',
    description: 'No need to go anywhere. We come to your home to wash your car, with no visit charges.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Fast & Reliable – Sparkling Clean in 30-45 Mins',
    description: 'Our process is quick and effective, leaving your car sparkling clean in no time.',
  },
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: 'Affordable Packages – Pocket-Friendly Rates',
    description: 'Our plans are designed to fit your budget, offering you premium service at a great price.',
  },
];


export default function FeaturesSection() {
    return (
        <section id="features" className="py-20 bg-secondary">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-headline">Why Choose Us?</h2>
                    <p className="mt-2 text-lg text-muted-foreground">The best choice for your car.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center p-6 flex flex-col items-center">
                            <CardHeader className="p-0 mb-4">
                                {feature.icon}
                            </CardHeader>
                            <CardTitle className="mb-2 text-xl">{feature.title}</CardTitle>
                            <CardContent className="p-0 text-muted-foreground">
                                {feature.description}
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Card className="max-w-md mx-auto bg-accent border-primary/50 shadow-lg">
                        <CardContent className="p-6">
                            <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                                <MapPin className="h-6 w-6 text-primary" />
                                Available in Guwahati Now!
                            </h3>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

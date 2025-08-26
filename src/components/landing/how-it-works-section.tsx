
'use client';

import { Calendar, Car, Smile } from 'lucide-react';

const howItWorksSteps = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Book Your Wash Online",
      description: "Easily choose your preferred plan and schedule your booking through our website.",
    },
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "Our Team Arrives at Your Doorstep",
      description: "We will arrive at your location with all the necessary professional equipment.",
    },
    {
      icon: <Smile className="h-8 w-8 text-primary" />,
      title: "Relax While We Pamper Your Car",
      description: "Sit back and relax while our experts make your car look as good as new.",
    },
];

export default function HowItWorksSection() {
    return (
        <section id="how-it-works" className="py-20">
            <div className="container">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold font-headline">How It Works</h2>
                    <p className="mt-2 text-lg text-muted-foreground">A premium car wash in three simple steps.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {howItWorksSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="mb-4 bg-primary/10 p-4 rounded-full">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <p className="text-2xl font-bold">Shine & Smile 😃</p>
                </div>
            </div>
      </section>
    )
}

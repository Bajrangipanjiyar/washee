
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MapPin, Rocket, Smile, Calendar, Car, Star } from 'lucide-react';

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
]

const faqs = [
    {
        question: 'Do I need to bring my car to a workshop?',
        answer: '👉 No! Our service is at your doorstep, and the visit is completely free.'
    },
    {
        question: 'Is the car wash process fast?',
        answer: '👉 Yes, your car will be sparkling clean in just 30-45 minutes.'
    },
    {
        question: 'Which cities is the service available in?',
        answer: '👉 Currently, we are only available in Guwahati. We will be launching in more cities soon.'
    },
    {
        question: 'What are the payment options?',
        answer: '👉 We currently accept online payments only.'
    }
]

function WLogo({ className }: { className?: string }) {
    return (
      <svg
        className={className}
        viewBox="0 0 100 70"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0L20 70L50 20L80 70L100 0H75L50 45L25 0H0Z" />
      </svg>
    );
  }

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
        <div className="text-center lg:text-start space-y-6">
          <main className="text-5xl md:text-6xl font-bold font-headline">
            <h1>Doorstep Car Wash – Fast, Easy & Hassle-Free</h1>
          </main>

          <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
            Premium car wash at your door. Hassle-free booking and professional service.
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Button className="w-full md:w-1/3" asChild>
              <Link href="/plans">View Plans & Book</Link>
            </Button>
          </div>
        </div>

        <div className="relative group flex items-center justify-center w-full h-full">
            <Image 
                src="https://storage.googleapis.com/maker-studio-52541.appspot.com/users/temp/2024-08-19T13:47:04.996Z.png" 
                alt="Car Wash" 
                width={600} 
                height={400} 
                className="rounded-lg shadow-2xl object-cover"
                data-ai-hint="car wash" 
            />
        </div>
      </section>

       {/* Features Section */}
      <section className="py-20 bg-secondary">
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
      
      {/* How it Works Section */}
      <section className="py-20">
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

      {/* FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline">Frequently Asked Questions</h2>
            <p className="mt-2 text-lg text-muted-foreground">Your questions, our answers.</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardHeader className="p-4 bg-background">
                        <h3 className="font-semibold">{faq.question}</h3>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

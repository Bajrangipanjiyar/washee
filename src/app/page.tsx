import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, MapPin, Rocket, Smile, Calendar, Car, Star } from 'lucide-react';

const features = [
  {
    icon: <Car className="h-10 w-10 text-primary" />,
    title: 'Doorstep Service – Bilkul Free Visit 🚗💦',
    description: 'Aapko kahin jaane ki zaroorat nahi. Hum aapke ghar aakar car wash karenge, aur visit ka koi charge nahi hai.',
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: 'Fast & Reliable – Sirf 30–45 min me sparkling clean',
    description: 'Humara process tez aur prabhavi hai, jisse aapki car jaldi se saaf aur chamakdar ho jaati hai.',
  },
  {
    icon: <Star className="h-10 w-10 text-primary" />,
    title: 'Affordable Packages – Pocket-friendly rates',
    description: 'Hamare plans aapke budget me fit hote hain, jisse aapko behtareen service kam daam me milti hai.',
  },
];

const howItWorksSteps = [
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Book your wash online",
      description: "Hamari website se aasani se apna plan chunein aur booking karein.",
    },
    {
      icon: <Car className="h-8 w-8 text-primary" />,
      title: "Hamari team aapke doorstep pe aayegi",
      description: "Hum apne saare zaroori samaan ke saath aapke diye gaye pate par aayenge.",
    },
    {
      icon: <Smile className="h-8 w-8 text-primary" />,
      title: "Relax while we wash your car",
      description: "Aap aaram karein jab tak hum aapki car ko naya jaisa bana rahe hain.",
    },
]

const faqs = [
    {
        question: 'Kya mujhe car workshop leke jaana padega?',
        answer: '👉 Nahi! Hamari service doorstep hai aur visit bilkul free hai.'
    },
    {
        question: 'Kya wash fast hai?',
        answer: '👉 Haan, sirf 30–45 min me ho jata hai.'
    },
    {
        question: 'Kaunse city me available hai?',
        answer: '👉 Abhi sirf Guwahati me. Jaldi hi aur cities me bhi launch hoga.'
    },
    {
        question: 'Payment kaise karna hoga?',
        answer: '👉 Sirf Online Payment hi accept hai.'
    }
]

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

        <div className="relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <Image
            src="https://placehold.co/700x500.png"
            alt="Shiny clean car"
            data-ai-hint="shiny car"
            width={700}
            height={500}
            className="rounded-lg shadow-2xl relative"
          />
        </div>
      </section>

       {/* Features Section */}
      <section className="py-20 bg-secondary">
          <div className="container">
              <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold font-headline">Why Choose Us?</h2>
                  <p className="mt-2 text-lg text-muted-foreground">Sabse alag, sabse behtar.</p>
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
            <p className="mt-2 text-lg text-muted-foreground">Char aasaan steps me car wash.</p>
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
                <p className="text-2xl font-bold">Shine & smile 😃</p>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline">Frequently Asked Questions</h2>
            <p className="mt-2 text-lg text-muted-foreground">Aapke sawal, hamare jawab.</p>
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

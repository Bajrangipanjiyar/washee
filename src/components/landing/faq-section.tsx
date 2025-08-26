
'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

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
        answer: '👉 We accept both online payments (via Razorpay) and Cash on Service for your convenience.'
    }
];

export default function FaqSection() {
    return (
        <section id="faq" className="py-20 bg-secondary">
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
    )
}

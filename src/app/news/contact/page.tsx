
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | Washee News',
    description: 'Get in touch with the Washee News team. We welcome your feedback, questions, and story ideas.',
};

export default function ContactNewsPage() {
    return (
        <div className="container py-12 max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Contact Washee News</CardTitle>
                    <CardDescription>
                        Have a story tip, feedback, or a question? We'd love to hear from you.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" type="text" placeholder="Your Name" />
                        </div>
                         <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Your Email Address" />
                        </div>
                         <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" type="text" placeholder="Subject of your message" />
                        </div>
                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="message">Message</Label>
                          <Textarea placeholder="Type your message here." id="message" />
                        </div>
                        <Button type="submit" className="w-full">Send Message</Button>
                    </form>
                    <div className="mt-8 text-center text-sm text-muted-foreground">
                        <p>For inquiries related to car wash services, please visit our main site at <a href="https://washee.in" className="text-primary underline">washee.in</a>.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

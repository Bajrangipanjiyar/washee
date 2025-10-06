
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
        <div className="container mx-auto px-4 py-12 max-w-2xl">
            <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader className="text-center border-b pb-6">
                    <CardTitle className="text-4xl font-extrabold">Contact Washee News</CardTitle>
                    <CardDescription className="text-lg text-gray-600 mt-2">
                        Have a story tip, feedback, or a question? We'd love to hear from you.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <form className="space-y-6">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name" className="font-semibold">Name</Label>
                            <Input id="name" type="text" placeholder="Your Name" className="bg-gray-100" />
                        </div>
                         <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email" className="font-semibold">Email</Label>
                            <Input id="email" type="email" placeholder="Your Email Address" className="bg-gray-100" />
                        </div>
                         <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="subject" className="font-semibold">Subject</Label>
                            <Input id="subject" type="text" placeholder="Subject of your message" className="bg-gray-100" />
                        </div>
                        <div className="grid w-full gap-1.5">
                          <Label htmlFor="message" className="font-semibold">Message</Label>
                          <Textarea placeholder="Type your message here." id="message" className="bg-gray-100" rows={5}/>
                        </div>
                        <Button type="submit" className="w-full bg-news-accent hover:bg-red-700 text-white font-bold py-3">Send Message</Button>
                    </form>
                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>For inquiries related to car wash services, please visit our main site at <a href="https://washee.in" className="text-blue-600 underline">washee.in</a>.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

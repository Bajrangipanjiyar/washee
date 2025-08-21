import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Refund & Cancellation Policy',
    description: 'Review our refund and cancellation policy for one-time and subscription-based car wash services. Learn about the process for cancellations and refunds.',
};

export default function RefundAndCancellationPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Refund &amp; Cancellation Policy</CardTitle>
                    <CardDescription>
                        Last Updated: Aug 19, 2025
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 text-muted-foreground">
                        <h3 className="font-bold text-foreground">One-Time Wash Service</h3>
                        <ul className="list-disc pl-5">
                            <li>Once booked, one-time services cannot be cancelled or refunded.</li>
                        </ul>

                        <h3 className="font-bold text-foreground pt-4">Subscription Plans</h3>
                        <ul className="list-disc pl-5 space-y-1">
                           <li>Subscriptions can only be cancelled by contacting our official support number at least 24 hours before the next scheduled wash.</li>
                            <li>If cancellation is not made in time, the wash will be considered valid and cannot be refunded.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground pt-4">Company-Initiated Cancellations</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>In case of unavoidable issues (bad weather, unavailability of staff, operational problems), Washee reserves the right to reschedule or cancel the booking.</li>
                            <li>In such cases, customers may receive a refund or service credit.</li>
                        </ul>

                        <h3 className="font-bold text-foreground pt-4">Refund Timeline</h3>
                        <ul className="list-disc pl-5">
                            <li>Approved refunds will be processed within 7-10 business days through the original payment method.</li>
                        </ul>

                        <h3 className="font-bold text-foreground pt-4">Contact Us</h3>
                        <p>If you have any questions, please reach out to us:<br/>
                        📍 Address: Rukmini Gao, S.K. Baruah Road, Kamrup, Assam – 781006<br/>
                        📞 Support Number: [+91 6003151047]<br/>
                        📧 Email: [panjiyarbajrangi@gmail.com]</p>
                        <p>We are available between 9:00 AM – 7:00 PM (IST), Monday to Sunday.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

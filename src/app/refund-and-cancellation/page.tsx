
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
                        Last Updated: July 20, 2024
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 text-muted-foreground">
                        <p>We strive to provide excellent service. This policy outlines the terms for cancellations and refunds for our services.</p>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">1. One-Time Wash Service</h3>
                            <p>Once a one-time wash service is booked and confirmed, it is considered final and cannot be cancelled or refunded. You may request to reschedule your service by contacting our support team at least 4 hours before the scheduled time, subject to availability.</p>
                        </div>

                        <div className="space-y-2">
                             <h3 className="font-bold text-foreground text-lg">2. Subscription Plans</h3>
                             <ul className="list-disc pl-5 space-y-2">
                               <li>You may cancel your monthly subscription at any time. To avoid being charged for the next billing cycle, you must cancel at least 48 hours before your renewal date.</li>
                                <li>Individual washes within a subscription can be rescheduled by contacting our support team at least 24 hours in advance. Missed appointments without prior notice will be forfeited and cannot be refunded or carried over.</li>
                                <li>No refunds are provided for partially used subscription periods.</li>
                            </ul>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">3. Company-Initiated Cancellations</h3>
                             <p>Washee reserves the right to reschedule or cancel a booking due to unforeseen circumstances, such as extreme weather, equipment failure, or staff unavailability. In such cases, we will contact you to reschedule the service at the earliest possible time. If we are unable to provide the service, a full refund for that specific service will be issued.</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">4. Refund Process</h3>
                             <ul className="list-disc pl-5 space-y-2">
                                <li>All approved refunds will be processed within 7-10 business days.</li>
                                <li>Refunds for payments made via Razorpay will be credited back to the original payment method. Refunds for cash payments may be handled via bank transfer or other mutually agreed-upon methods.</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">5. Contact Us</h3>
                            <p>For all cancellation, rescheduling, or refund requests, please contact our support team:</p>
                             <ul className="list-none space-y-1">
                                <li><strong>Email:</strong> <a href="mailto:panjiyarbajrangi@gmail.com" className="text-primary">panjiyarbajrangi@gmail.com</a></li>
                                <li><strong>Phone:</strong> <a href="tel:+916003151047" className="text-primary">+91 6003151047</a>, <a href="tel:+919365520395" className="text-primary">+91 9365520395</a></li>
                                <li><strong>Support Hours:</strong> 9:00 AM – 7:00 PM (IST), Monday to Sunday.</li>
                                 <li><strong>Address:</strong> Rukmini Gao, S.K. Baruah Road, Kamrup, Assam – 781006</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

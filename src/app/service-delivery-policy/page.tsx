
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Service Delivery Policy',
    description: 'Understand how Washee delivers its professional car wash services directly to your doorstep. Learn about our service area, scheduling, and what to expect on the day of service.',
};

export default function ServiceDeliveryPolicyPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Service Delivery Policy</CardTitle>
                    <CardDescription>
                        Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 text-muted-foreground">
                        <p>This Service Delivery Policy explains how Washee ("we", "us", "our") provides its professional doorstep car wash services. As we offer a service and not a physical product, this policy outlines our delivery process and standards.</p>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">1. Service Delivery</h3>
                             <ul className="list-disc pl-5 space-y-2">
                                <li>Our services are rendered directly at the location provided by you ("the customer") during the booking process.</li>
                                <li>Delivery of our services will be confirmed via your registered email ID and on your "My Bookings" page on our website after a successful booking.</li>
                                <li>The delivery of service is subject to the agreed-upon date and time slot, confirmed at the time of order placement.</li>
                            </ul>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">2. Service Area</h3>
                            <p>Our services are exclusively available within the city limits of **Guwahati, Assam**. We reserve the right to decline bookings that fall outside our designated service area.</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">3. Scheduling and Timeliness</h3>
                             <ul className="list-disc pl-5 space-y-2">
                                <li>All services must be booked through our official website.</li>
                                <li>We strive to dispatch our service team to arrive at your location within the scheduled time slot. However, please allow for a grace period of up to 30 minutes due to potential traffic or other unforeseen delays.</li>
                                <li>Washee is not liable for any delay in service delivery due to circumstances beyond our control, such as an incorrect address provided by the customer, unavailability of the customer, or restricted access to the location.</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">4. Customer Responsibilities</h3>
                             <ul className="list-disc pl-5 space-y-2">
                                <li>Ensure the vehicle is available at the specified address during the scheduled time.</li>
                                <li>Provide a safe and accessible location for our team to work, with adequate space around the vehicle.</li>
                                <li>If our team is unable to access the vehicle or location, the service may be considered forfeited. Please refer to our <a href="/refund-and-cancellation" className="text-primary underline">Refund &amp; Cancellation Policy</a> for more details.</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">5. Contact Us</h3>
                            <p>For any issues in utilizing our services or for rescheduling requests, you may contact our helpdesk:</p>
                             <ul className="list-none space-y-1">
                                <li><strong>Email:</strong> <a href="mailto:panjiyarbajrangi@gmail.com" className="text-primary">panjiyarbajrangi@gmail.com</a></li>
                                <li><strong>Phone:</strong> <a href="tel:+919365520395" className="text-primary">+91 9365520395</a>, <a href="tel:+916003151047" className="text-primary">+91 6003151047</a></li>
                                <li><strong>Address:</strong> Rukmini Gao, S.K. Baruah Road, Kamrup, Assam – 781006</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

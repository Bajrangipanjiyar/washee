
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
                        <p>This Service Delivery Policy explains how Washee provides its doorstep car wash services to you ("the customer"). As we provide a service and not a physical product, this policy outlines our process instead of a traditional shipping policy.</p>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">1. Service Area</h3>
                            <p>Our services are currently available exclusively within the city limits of **Guwahati, Assam**. We reserve the right to decline bookings that fall outside our designated service area.</p>
                        </div>

                        <div className="space-y-2">
                             <h3 className="font-bold text-foreground text-lg">2. Booking and Scheduling</h3>
                             <ul className="list-disc pl-5 space-y-2">
                               <li>All services must be booked through our official website.</li>
                               <li>During the booking process, you will be required to select a preferred date and a time slot for the service.</li>
                               <li>Upon successful booking, you will receive a confirmation of your service appointment. While we strive to meet the selected time slot, please allow for a grace period of 30 minutes for our team's arrival due to potential traffic or other unforeseen delays.</li>
                            </ul>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">3. Service Delivery Process</h3>
                             <ul className="list-disc pl-5 space-y-2">
                                <li>Our professional team will arrive at the address you provided during booking within the scheduled time frame.</li>
                                <li>Our team will come equipped with all necessary tools, cleaning products, and equipment to perform the car wash service.</li>
                                <li>You are responsible for providing a safe and accessible location for our team to work. This includes ensuring adequate space around the vehicle for our staff to operate.</li>
                             </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">4. Customer Responsibilities</h3>
                             <ul className="list-disc pl-5 space-y-2">
                                <li>Please ensure the vehicle is available at the specified address during the scheduled time.</li>
                                <li>If our team is unable to access the vehicle or location upon arrival, the service may be considered forfeited. Please refer to our <a href="/refund-and-cancellation" className="text-primary underline">Refund & Cancellation Policy</a> for more details.</li>
                                <li>Please remove all valuable personal items from your car before the service begins.</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">5. Contact Us</h3>
                            <p>If you need to reschedule or have any questions regarding your service delivery, please contact us at least 4 hours before your scheduled appointment:</p>
                             <ul className="list-none space-y-1">
                                <li><strong>Email:</strong> <a href="mailto:panjiyarbajrangi@gmail.com" className="text-primary">panjiyarbajrangi@gmail.com</a></li>
                                <li><strong>Phone:</strong> <a href="tel:+916003151047" className="text-primary">+91 6003151047</a></li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

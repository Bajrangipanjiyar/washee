

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
    title: 'Terms and Conditions',
    description: 'Read the terms and conditions for using Washee\'s doorstep car wash services. Understand our policies on booking, payments, cancellations, and more.',
};

export default function TermsAndConditionsPage() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <div className="container py-12">
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-3xl">Terms and Conditions</CardTitle>
                            <CardDescription>
                                 Last Updated: July 20, 2024
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 text-muted-foreground">
                                <p>Welcome to Washee. These Terms and Conditions govern your use of our website, services, and mobile application. By accessing or using our service, you agree to be bound by these terms.</p>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">1. Services</h3>
                                    <p>Washee provides professional doorstep car wash services, available as both one-time bookings and monthly subscription plans. Service details, scope, and limitations are described on our "Plans" page.</p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">2. User Accounts</h3>
                                    <p>To access most features, you must register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to provide accurate and complete information.</p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">3. Bookings, Payments, and Pricing</h3>
                                     <ul className="list-disc pl-5 space-y-2">
                                        <li>All bookings must be made through our official website or app.</li>
                                        <li>We accept payments via our secure payment partner, Razorpay, and also offer a "Cash on Service" option.</li>
                                        <li>All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes, unless stated otherwise. We reserve the right to change our prices at any time.</li>
                                    </ul>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">4. Cancellation and Refund Policy</h3>
                                    <p>Our Cancellation and Refund Policy is an integral part of these terms. Please refer to our <a href="/refund-and-cancellation" className="text-primary underline">Refund &amp; Cancellation Policy</a> page for detailed information.</p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">5. Customer Responsibilities</h3>
                                     <ul className="list-disc pl-5 space-y-2">
                                        <li>You must provide a safe, accessible location for our team to perform the service, with adequate space around the vehicle.</li>
                                        <li>Please remove all valuable personal belongings from your vehicle before the service begins. Washee is not liable for any loss or damage to personal items left in the vehicle.</li>
                                        <li>You are responsible for ensuring your vehicle is in a suitable condition for the service. We are not liable for pre-existing damages.</li>
                                    </ul>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">6. Limitation of Liability</h3>
                                    <p>To the fullest extent permitted by law, Washee shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services. Our total liability for any claim arising out of these terms or our services will not exceed the amount you paid us for the service in question.</p>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">7. Intellectual Property</h3>
                                    <p>The Washee name, logo, and all related content, designs, and materials on our website and app are the exclusive property of Washee. Unauthorized use, reproduction, or distribution is strictly prohibited.</p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">8. Governing Law and Dispute Resolution</h3>
                                    <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Guwahati, Assam.</p>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">9. Contact Us</h3>
                                    <p>For any questions, support, or concerns regarding these terms, please contact us at:</p>
                                    <ul className="list-none space-y-1">
                                        <li><strong>Email:</strong> <a href="mailto:panjiyarbajrangi@gmail.com" className="text-primary">panjiyarbajrangi@gmail.com</a></li>
                                        <li><strong>Phone:</strong> <a href="tel:+916003151047" className="text-primary">+91 6003151047</a>, <a href="tel:+919365520395" className="text-primary">+91 9365520395</a></li>
                                        <li><strong>Address:</strong> Rukmini Gao, S.K. Baruah Road, Kamrup, Assam – 781006</li>
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    )
}

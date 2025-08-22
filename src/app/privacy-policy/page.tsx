import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Your privacy is important to us. Read the Washee privacy policy to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Privacy Policy</CardTitle>
                    <CardDescription>
                         Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="space-y-6 text-muted-foreground">
                        <p>At Washee ("we," "us," or "our"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our services.</p>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">1. Information We Collect</h3>
                            <p>We may collect the following types of information:</p>
                             <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and physical address provided during booking or account registration.</li>
                                <li><strong>Booking Information:</strong> Details about the services you book, including car type, plan, date, and time slot.</li>
                                <li><strong>Payment Information:</strong> We do not store your full credit/debit card or UPI details. Payments are processed securely by our third-party payment gateway, Razorpay, which may collect payment information directly from you.</li>
                                <li><strong>Technical Data:</strong> We may automatically collect information about your device and usage, such as IP address, browser type, and operating system.</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">2. How We Use Your Information</h3>
                            <p>We use the information we collect for various purposes, including:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>To provide, operate, and maintain our services.</li>
                                <li>To process your bookings and transactions.</li>
                                <li>To communicate with you, including sending booking confirmations, reminders, and support messages.</li>
                                <li>To improve our website, services, and customer experience.</li>
                                <li>To prevent fraudulent activities and enhance the security of our platform.</li>
                            </ul>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">3. Data Sharing and Disclosure</h3>
                            <p>We do not sell or rent your personal data. We may share your information with third parties only in the following situations:</p>
                             <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Service Providers:</strong> With trusted third-party vendors who perform services for us, such as payment processing (Razorpay) and communications.</li>
                                <li><strong>Legal Requirements:</strong> If required to do so by law or in response to valid requests by public authorities.</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">4. Data Security</h3>
                            <p>We implement administrative, technical, and physical security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee its absolute security.</p>
                        </div>

                         <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">5. Your Rights</h3>
                            <p>You have the right to access, correct, or request the deletion of your personal data. To exercise these rights, please contact us using the details below.</p>
                        </div>
                        
                         <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">6. Changes to This Privacy Policy</h3>
                            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">7. Contact Us</h3>
                            <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:panjiyarbajrangi@gmail.com" className="text-primary">panjiyarbajrangi@gmail.com</a>.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

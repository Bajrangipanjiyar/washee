import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    return (
        <div className="container py-12">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-3xl">Privacy Policy</CardTitle>
                    <CardDescription>
                         Last Updated: Aug 19, 2025
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="space-y-4 text-muted-foreground">
                        <p>At Washee, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.</p>
                        
                        <h3 className="font-bold text-foreground pt-4">Information We Collect</h3>
                         <ul className="list-disc pl-5 space-y-1">
                            <li>Personal details (name, phone number, email, address) when you book a service.</li>
                            <li>Payment details through our secure payment partner (Razorpay).</li>
                            <li>Location information for providing doorstep service.</li>
                        </ul>

                        <h3 className="font-bold text-foreground pt-4">How We Use Your Information</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>To confirm and deliver your car wash bookings.</li>
                            <li>To communicate with you regarding services, cancellations, or offers.</li>
                            <li>To improve our services and customer experience.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground pt-4">Data Protection</h3>
                         <ul className="list-disc pl-5 space-y-1">
                            <li>We do not sell or share your personal data with any unauthorized third parties.</li>
                            <li>Payments are processed securely through Razorpay. We never store your card or UPI details.</li>
                        </ul>

                        <h3 className="font-bold text-foreground pt-4">Third-Party Sharing</h3>
                        <p>Only shared with trusted partners (payment gateways, SMS/email providers) for completing transactions.</p>
                        
                        <h3 className="font-bold text-foreground pt-4">Your Rights</h3>
                        <p>You may request correction or deletion of your personal information by contacting us on our official number/email.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

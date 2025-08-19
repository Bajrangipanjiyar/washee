'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import Link from "next/link";
  

function WLogo({ className }: { className?: string }) {
    return (
      <svg
        className={className}
        viewBox="0 0 100 70"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0L20 70L50 20L80 70L100 0H75L50 45L25 0H0Z" />
      </svg>
    );
  }

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <WLogo className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} Washee. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
             <Link href="tel:+916003151047" className="hover:text-primary">+91 6003151047</Link>
             <Link href="mailto:panjiyarbajrangi@gmail.com" className="hover:text-primary">panjiyarbajrangi@gmail.com</Link>
            
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-sm px-1">About Us</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                    <DialogTitle>About Us</DialogTitle>
                    <DialogDescription>
                        Welcome to Washee – Your Doorstep Car Care Partner.
                    </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <p>Washee is not just another car wash service, it is a promise of convenience, quality, and trust. We understand that in today’s fast-paced life, finding time to maintain your car can be difficult. That’s why we bring professional car wash services right to your doorstep – saving you time, effort, and hassle.</p>
                        <p>The idea of Washee was born with a simple mission:👉 To make car cleaning effortless and accessible for everyone.</p>
                        
                        <h3 className="font-bold text-foreground">Our Founders</h3>
                        <p><strong>Dharmaraj Ram (Founder)</strong> – The visionary behind Washee, whose passion for innovation and service excellence laid the foundation of this venture. His belief is simple – a clean car reflects a clear lifestyle.</p>
                        <p><strong>Bajrangi Panjiyar (CEO)</strong> – Leading Washee with dedication and strategy, he ensures that our operations are smooth, customer-centric, and future-ready. Under his leadership, Washee is growing as a reliable name in the doorstep car wash industry.</p>

                        <h3 className="font-bold text-foreground">Our Commitment</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Convenience at your door – Book a wash anytime, anywhere.</li>
                            <li>Professional care – Trained staff with modern techniques.</li>
                            <li>Affordable plans – From one-time washes to easy subscriptions.</li>
                            <li>Trust &amp; transparency – No hidden charges, no compromise on quality.</li>
                        </ul>

                        <p>At Washee, we believe that a car is not just a vehicle, it’s a partner in your journey. Keeping it clean should never be a burden. With us, car care becomes simple, reliable, and stress-free.</p>
                        <p className="font-bold text-center">🌟 Washee – Because your car deserves the best care.</p>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-sm px-1">Terms &amp; Conditions</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                    <DialogDescription>
                        Last Updated: Aug 19, 2025
                    </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <p>Welcome to Washee – a doorstep car wash service operated by Dharamraj Ram, located at Rukmini Gao, S.K. Baruah Road, Kamrup, Assam – 781006.</p>
                        <p>By booking our services or using our website/app, you agree to the following Terms &amp; Conditions:</p>
                        
                        <h3 className="font-bold text-foreground">1. Services</h3>
                        <p>We provide doorstep car wash services under two categories:</p>
                        <ul className="list-disc pl-5">
                            <li>One-Time Car Wash Service</li>
                            <li>Subscription-based Car Wash Plans</li>
                        </ul>

                        <h3 className="font-bold text-foreground">2. Booking &amp; Payments</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>All bookings must be made through our official website/app.</li>
                            <li>Payments are processed securely through Razorpay or other authorized payment partners.</li>
                            <li>Prices displayed at the time of booking are final and inclusive of applicable taxes (if any).</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">3. Cancellation &amp; Refund Policy</h3>
                        <h4 className="font-semibold text-foreground">One-Time Service:</h4>
                        <ul className="list-disc pl-5">
                            <li>Once booked, one-time services cannot be cancelled or refunded.</li>
                        </ul>
                         <h4 className="font-semibold text-foreground">Subscription Service:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Subscriptions can only be cancelled by contacting our official support number at least 24 hours before the next scheduled wash.</li>
                            <li>If cancellation is not made within this time frame, the scheduled wash will be considered valid and cannot be refunded.</li>
                            <li>In case of operational issues (bad weather, unavailability of staff, etc.), Washee reserves the right to reschedule or cancel the service. Refunds/credits may be provided in such cases.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">4. Customer Responsibility</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>The customer must provide proper access to the vehicle for cleaning.</li>
                            <li>Valuable items should be removed from the car before service. Washee is not responsible for loss/damage of personal belongings inside the vehicle.</li>
                            <li>Service may be refused if the vehicle location is unsafe or inaccessible.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">5. Service Quality &amp; Limitations</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>We ensure professional service, but results may vary depending on the condition of the car.</li>
                            <li>Heavy stains, dents, or damages may not be completely removed.</li>
                            <li>Washee is not responsible for pre-existing damages on the vehicle.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">6. Intellectual Property</h3>
                        <p>All content, logos, designs, and material on our website/app are owned by Washee. Unauthorized use is strictly prohibited.</p>
                        
                        <h3 className="font-bold text-foreground">7. Limitation of Liability</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Washee will not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</li>
                            <li>Any disputes shall be subject to the jurisdiction of Assam, India.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">8. Contact Us</h3>
                        <p>For cancellations, queries, or support, please contact us at:<br/>
                        📞 [6003151047 and 9365520395]<br/>
                        📧 [panjiyarbajrangi@gmail.com]</p>
                    </div>
                </DialogContent>
            </Dialog>

             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-sm px-1">Privacy Policy</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                    <DialogTitle>Privacy Policy</DialogTitle>
                    <DialogDescription>
                        Last Updated: Aug 19, 2025
                    </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <p>At Washee, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data.</p>
                        
                        <h3 className="font-bold text-foreground">Information We Collect</h3>
                         <ul className="list-disc pl-5 space-y-1">
                            <li>Personal details (name, phone number, email, address) when you book a service.</li>
                            <li>Payment details through our secure payment partner (Razorpay).</li>
                            <li>Location information for providing doorstep service.</li>
                        </ul>

                        <h3 className="font-bold text-foreground">How We Use Your Information</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>To confirm and deliver your car wash bookings.</li>
                            <li>To communicate with you regarding services, cancellations, or offers.</li>
                            <li>To improve our services and customer experience.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">Data Protection</h3>
                         <ul className="list-disc pl-5 space-y-1">
                            <li>We do not sell or share your personal data with any unauthorized third parties.</li>
                            <li>Payments are processed securely through Razorpay. We never store your card or UPI details.</li>
                        </ul>

                        <h3 className="font-bold text-foreground">Third-Party Sharing</h3>
                        <p>Only shared with trusted partners (payment gateways, SMS/email providers) for completing transactions.</p>
                        
                        <h3 className="font-bold text-foreground">Your Rights</h3>
                        <p>You may request correction or deletion of your personal information by contacting us on our official number/email.</p>
                    </div>
                </DialogContent>
            </Dialog>

             <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-sm px-1">Refund &amp; Cancellation</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                    <DialogTitle>Refund &amp; Cancellation Policy</DialogTitle>
                    <DialogDescription>
                        Last Updated: Aug 19, 2025
                    </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <h3 className="font-bold text-foreground">One-Time Wash Service</h3>
                        <ul className="list-disc pl-5">
                            <li>Once booked, one-time services cannot be cancelled or refunded.</li>
                        </ul>

                        <h3 className="font-bold text-foreground">Subscription Plans</h3>
                        <ul className="list-disc pl-5 space-y-1">
                           <li>Subscriptions can only be cancelled by contacting our official support number at least 24 hours before the next scheduled wash.</li>
                            <li>If cancellation is not made in time, the wash will be considered valid and cannot be refunded.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">Company-Initiated Cancellations</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>In case of unavoidable issues (bad weather, unavailability of staff, operational problems), Washee reserves the right to reschedule or cancel the booking.</li>
                            <li>In such cases, customers may receive a refund or service credit.</li>
                        </ul>

                        <h3 className="font-bold text-foreground">Refund Timeline</h3>
                        <ul className="list-disc pl-5">
                            <li>Approved refunds will be processed within 7-10 business days through the original payment method.</li>
                        </ul>

                        <h3 className="font-bold text-foreground">Contact Us</h3>
                        <p>If you have any questions, please reach out to us:<br/>
                        📍 Address: Rukmini Gao, S.K. Baruah Road, Kamrup, Assam – 781006<br/>
                        📞 Support Number: [+91 6003151047]<br/>
                        📧 Email: [panjiyarbajrangi@gmail.com]</p>
                        <p>We are available between 9:00 AM – 7:00 PM (IST), Monday to Sunday.</p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
      </div>
    </footer>
  );
}

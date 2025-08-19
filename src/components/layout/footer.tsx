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
            &copy; {new Date().getFullYear()} Washee. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:flex-row md:gap-4">
             <Link href="tel:+916003151047" className="hover:text-primary">+91 6003151047</Link>
             <Link href="mailto:panjiyarbajrangi@gmail.com" className="hover:text-primary">panjiyarbajrangi@gmail.com</Link>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-sm">Terms & Conditions</Button>
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
                        <p>By booking our services or using our website/app, you agree to the following Terms & Conditions:</p>
                        
                        <h3 className="font-bold text-foreground">1. Services</h3>
                        <p>We provide doorstep car wash services under two categories:</p>
                        <ul className="list-disc pl-5">
                            <li>One-Time Car Wash Service</li>
                            <li>Subscription-based Car Wash Plans</li>
                        </ul>

                        <h3 className="font-bold text-foreground">2. Booking & Payments</h3>
                        <ul className="list-disc pl-5">
                            <li>All bookings must be made through our official website/app.</li>
                            <li>Payments are processed securely through Razorpay or other authorized payment partners.</li>
                            <li>Prices displayed at the time of booking are final and inclusive of applicable taxes (if any).</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">3. Cancellation & Refund Policy</h3>
                        <h4 className="font-semibold text-foreground">One-Time Service:</h4>
                        <ul className="list-disc pl-5">
                            <li>Once booked, one-time services cannot be cancelled or refunded.</li>
                        </ul>
                         <h4 className="font-semibold text-foreground">Subscription Service:</h4>
                        <ul className="list-disc pl-5">
                            <li>Subscriptions can only be cancelled by contacting our official support number at least 24 hours before the next scheduled wash.</li>
                            <li>If cancellation is not made within this time frame, the scheduled wash will be considered valid and cannot be refunded.</li>
                            <li>In case of operational issues (bad weather, unavailability of staff, etc.), Washee reserves the right to reschedule or cancel the service. Refunds/credits may be provided in such cases.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">4. Customer Responsibility</h3>
                        <ul className="list-disc pl-5">
                            <li>The customer must provide proper access to the vehicle for cleaning.</li>
                            <li>Valuable items should be removed from the car before service. Washee is not responsible for loss/damage of personal belongings inside the vehicle.</li>
                            <li>Service may be refused if the vehicle location is unsafe or inaccessible.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">5. Service Quality & Limitations</h3>
                        <ul className="list-disc pl-5">
                            <li>We ensure professional service, but results may vary depending on the condition of the car.</li>
                            <li>Heavy stains, dents, or damages may not be completely removed.</li>
                            <li>Washee is not responsible for pre-existing damages on the vehicle.</li>
                        </ul>
                        
                        <h3 className="font-bold text-foreground">6. Intellectual Property</h3>
                        <p>All content, logos, designs, and material on our website/app are owned by Washee. Unauthorized use is strictly prohibited.</p>
                        
                        <h3 className="font-bold text-foreground">7. Limitation of Liability</h3>
                        <ul className="list-disc pl-5">
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
        </div>
      </div>
    </footer>
  );
}

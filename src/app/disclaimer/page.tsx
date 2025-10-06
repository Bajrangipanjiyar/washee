

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";


export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Read the disclaimer for Washee\'s services to understand the terms of use, limitations of liability, and our policies regarding pre-existing damage and personal belongings.',
};

export default function DisclaimerPage() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <div className="container py-12">
                    <Card className="max-w-4xl mx-auto">
                        <CardHeader>
                            <CardTitle className="text-3xl">Disclaimer</CardTitle>
                            <CardDescription>
                                 Last Updated: July 20, 2024
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 text-muted-foreground">
                                <p>The information provided by Washee ("we," "us," or "our") on our website is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">1. Service Results</h3>
                                    <p>The final results of our car wash services may vary depending on the initial condition of the vehicle, the type of stains, and the age of the car. While we strive for the best possible outcome, we cannot guarantee the complete removal of all stains, scratches, or blemishes.</p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">2. Pre-existing Damage</h3>
                                    <p>Washee is not responsible for any pre-existing damage to your vehicle, including but not limited to scratches, dents, swirl marks, or cracked windshields. Our technicians are trained to be careful, but we will not be held liable for damage that was present before our service began.</p>
                                </div>
                                
                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">3. Personal Belongings</h3>
                                    <p>We strongly advise all customers to remove all personal and valuable items from their vehicle before the service begins. Washee is not liable for any loss of or damage to personal belongings left inside the vehicle.</p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">4. Engine and Components</h3>
                                    <p>Cleaning engine compartments or other mechanical parts carries inherent risks. If you request such a service, you agree that Washee will not be held responsible for any mechanical or electrical issues that may arise.</p>
                                </div>

                                 <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">5. External Links Disclaimer</h3>
                                    <p>Our website may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.</p>
                                </div>
                                
                                 <div className="space-y-2">
                                    <h3 className="font-bold text-foreground text-lg">6. Consent</h3>
                                    <p>By using our website and booking our services, you hereby consent to our disclaimer and agree to its terms.</p>
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

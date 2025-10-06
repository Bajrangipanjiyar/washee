
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer | Washee News',
    description: 'Disclaimer for Washee News. The information provided is for general informational purposes only.',
};

export default function DisclaimerNewsPage() {
    return (
        <div className="container py-12 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Disclaimer for Washee News</CardTitle>
                    <CardDescription>
                         Last Updated: July 24, 2024
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6 text-muted-foreground">
                        <p>The information provided by Washee News on washee.in/news (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
                        
                        <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">1. Professional Disclaimer</h3>
                            <p>The Site cannot and does not contain car repair or professional automotive advice. The automotive information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. The use or reliance of any information contained on this site is solely at your own risk.</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">2. External Links Disclaimer</h3>
                            <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.</p>
                        </div>
                        
                         <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">3. Opinions and Views</h3>
                            <p>The views and opinions expressed on this Site are those of the authors and do not necessarily reflect the official policy or position of any other agency, organization, employer, or company, including Washee's car wash service division.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

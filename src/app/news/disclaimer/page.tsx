
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer | Washee News',
    description: 'Disclaimer for Washee News. The information provided is for general informational purposes only.',
};

export default function DisclaimerNewsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader className="border-b pb-6">
                    <CardTitle className="text-4xl font-extrabold">Disclaimer for Washee News</CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                         Last Updated: July 25, 2024
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="prose prose-lg max-w-none text-gray-700">
                        <p>The information provided by Washee News on the washee.in/news sub-domain (the "Site") is for general informational and entertainment purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
                        
                        <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.</p>
                        
                        <h3>Professional Disclaimer</h3>
                        <p>The Site cannot and does not contain financial, legal, or medical advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. The use or reliance of any information contained on this site is solely at your own risk.</p>

                        <h3>External Links Disclaimer</h3>
                        <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.</p>
                        
                        <h3>Opinions and Views</h3>
                        <p>The views and opinions expressed on this Site are those of the authors and do not necessarily reflect the official policy or position of any other agency, organization, employer, or company, including the car wash service division of Washee.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

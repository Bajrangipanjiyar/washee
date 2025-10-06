
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Washee News',
    description: 'Read the Privacy Policy for Washee News to understand how we handle data, cookies, and user privacy on our news platform.',
};

export default function PrivacyPolicyNewsPage() {
    return (
        <div className="container py-12 max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Privacy Policy for Washee News</CardTitle>
                    <CardDescription>
                         Last Updated: July 24, 2024
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="space-y-6 text-muted-foreground">
                        <p>This Privacy Policy governs the manner in which Washee News collects, uses, maintains, and discloses information collected from users (each, a "User") of the washee.in/news website ("Site"). This privacy policy applies to the Site and all products and services offered by Washee News.</p>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">1. Information We Collect</h3>
                            <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer, and technical information about Users' means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.</p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">2. Web Browser Cookies</h3>
                            <p>Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>
                        </div>
                        
                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">3. How We Use Collected Information</h3>
                            <p>Washee News may collect and use Users' information for the following purposes:</p>
                             <ul className="list-disc pl-5 space-y-2">
                                <li><strong>To improve our Site:</strong> We may use feedback you provide to improve our content and offerings.</li>
                                <li><strong>To run a promotion, contest, survey or other Site feature:</strong> To send Users information they agreed to receive about topics we think will be of interest to them.</li>
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">4. Advertising</h3>
                            <p>Ads appearing on our site may be delivered to Users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile non-personal identification information about you or others who use your computer. This privacy policy does not cover the use of cookies by any advertisers.</p>
                        </div>

                         <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">5. Changes to This Privacy Policy</h3>
                            <p>Washee News has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>
                        </div>
                        
                         <div className="space-y-2">
                            <h3 className="font-bold text-foreground text-lg">6. Your Acceptance of These Terms</h3>
                            <p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

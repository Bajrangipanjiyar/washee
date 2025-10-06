
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Washee News',
    description: 'Read the Privacy Policy for Washee News to understand how we handle data, cookies, and user privacy on our news platform.',
};

export default function PrivacyPolicyNewsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Card className="bg-white shadow-lg rounded-lg">
                <CardHeader className="border-b pb-6">
                    <CardTitle className="text-4xl font-extrabold">Privacy Policy for Washee News</CardTitle>
                    <CardDescription className="text-gray-600 mt-2">
                         Last Updated: July 25, 2024
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                     <div className="prose prose-lg max-w-none text-gray-700">
                        <p>This Privacy Policy governs the manner in which Washee News collects, uses, maintains, and discloses information collected from users (each, a "User") of the washee.in/news website ("Site"). This privacy policy applies to the Site and all products and services offered by Washee News.</p>
                        
                        <h3>Information We Collect</h3>
                        <p>We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer, and technical information about Users' means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information. If you choose to sign up for a newsletter or create an account, we may collect personal information such as your name and email address.</p>

                        <h3>Web Browser Cookies</h3>
                        <p>Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. You may choose to set your web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.</p>
                        
                        <h3>How We Use Collected Information</h3>
                        <p>Washee News may collect and use Users' information for the following purposes:</p>
                         <ul>
                            <li><strong>To improve our Site:</strong> We may use feedback you provide to improve our content and offerings.</li>
                            <li><strong>To personalize user experience:</strong> We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
                            <li><strong>To send periodic emails:</strong> If a User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc.</li>
                        </ul>

                        <h3>Advertising</h3>
                        <p>Ads appearing on our site may be delivered to Users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile non-personal identification information about you or others who use your computer. This privacy policy does not cover the use of cookies by any advertisers.</p>

                        <h3>Changes to This Privacy Policy</h3>
                        <p>Washee News has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.</p>
                        
                        <h3>Your Acceptance of These Terms</h3>
                        <p>By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

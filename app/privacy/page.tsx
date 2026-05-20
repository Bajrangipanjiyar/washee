import Navbar from '@/components/Navbar';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          
          <h1 className="text-4xl font-black text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500 mb-8 font-medium">Last Updated: May 2026</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
              <p>At Washee, we collect information that is necessary to provide you with our doorstep car wash services. This includes your Name, Phone Number, Service Address (including City and Pincode), and Vehicle details (Car Type). We do not collect or store your sensitive payment details on our servers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
              <p>The information we collect is strictly used to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Schedule and dispatch our team to your doorstep.</li>
                <li>Send booking confirmations and status updates via SMS, Call, or Telegram.</li>
                <li>Improve our customer service and service delivery in Guwahati.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Data Protection</h2>
              <p>Your privacy is our priority. Your data is stored securely using industry-standard cloud infrastructure (Firebase by Google). We do not sell, trade, or rent your personal identification information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at our official phone number: <strong>+91 6003151047</strong>.</p>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
import Navbar from '@/components/Navbar';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          
          <h1 className="text-4xl font-black text-gray-900 mb-4">Disclaimer</h1>
          <p className="text-gray-500 mb-8 font-medium">Last Updated: July 20, 2024</p>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-6">
            <p>The information provided by Washee ("we," "us," or "our") on our website is for general informational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">1. Service Results</h3>
            <p>The final results of our car wash services may vary depending on the initial condition of the vehicle, the type of stains, and the age of the car. While we strive for the best possible outcome, we cannot guarantee the complete removal of all stains, scratches, or blemishes.</p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">2. Pre-existing Damage</h3>
            <p>Washee is not responsible for any pre-existing damage to your vehicle, including but not limited to scratches, dents, swirl marks, or cracked windshields. Our technicians are trained to be careful, but we will not be held liable for damage that was present before our service began.</p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">3. Personal Belongings</h3>
            <p>We strongly advise all customers to remove all personal and valuable items from their vehicle before the service begins. Washee is not liable for any loss of or damage to personal belongings left inside the vehicle.</p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">4. Engine and Components</h3>
            <p>Cleaning engine compartments or other mechanical parts carries inherent risks. If you request such a service, you agree that Washee will not be held responsible for any mechanical or electrical issues that may arise.</p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">5. External Links Disclaimer</h3>
            <p>Our website may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites.</p>

            <h3 className="text-xl font-bold text-gray-900 mt-6">6. Consent</h3>
            <p>By using our website and booking our services, you hereby consent to our disclaimer and agree to its terms.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
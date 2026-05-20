import Navbar from '@/components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8 md:p-12">
          
          <div className="text-center mb-12">
            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">Our Story</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">Welcome to Washee</h1>
            <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">Your Doorstep Car Care Partner.</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed mb-16">
            <p>
              Washee is not just another car wash service, it is a promise of convenience, quality, and trust. We understand that in today’s fast-paced life, finding time to maintain your car can be difficult. That’s why we bring professional car wash services right to your doorstep – saving you time, effort, and hassle.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-2xl my-8">
              <p className="text-lg font-bold text-gray-900 m-0">
                🚀 The idea of Washee was born with a simple mission:<br/>
                <span className="text-blue-700">To make car cleaning effortless and accessible for everyone.</span>
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">Meet Our Founders</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center text-2xl font-black mb-4 shadow-lg">DR</div>
              <h3 className="text-xl font-bold text-gray-900">Dharmaraj Ram</h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-3">Founder</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                The visionary behind Washee, whose passion for innovation and service excellence laid the foundation of this venture. His belief is simple – a clean car reflects a clear lifestyle.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-md transition">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black text-white rounded-full flex items-center justify-center text-2xl font-black mb-4 shadow-lg">BP</div>
              <h3 className="text-xl font-bold text-gray-900">Bajrangi Panjiyar</h3>
              <p className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-3">CEO</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Leading Washee with dedication and strategy, he ensures that our operations are smooth, customer-centric, and future-ready. Under his leadership, Washee is growing as a reliable name in the doorstep car wash industry.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">Our Commitment</h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start gap-3"><span className="text-green-500 text-xl">✔</span> <strong>Convenience at your door:</strong> Book a wash anytime, anywhere.</li>
            <li className="flex items-start gap-3"><span className="text-green-500 text-xl">✔</span> <strong>Professional care:</strong> Trained staff with modern techniques.</li>
            <li className="flex items-start gap-3"><span className="text-green-500 text-xl">✔</span> <strong>Affordable plans:</strong> From one-time washes to easy subscriptions.</li>
            <li className="flex items-start gap-3"><span className="text-green-500 text-xl">✔</span> <strong>Trust & transparency:</strong> No hidden charges, no compromise on quality.</li>
          </ul>

          <div className="mt-12 text-center text-gray-500 font-medium italic">
            "At Washee, we believe that a car is not just a vehicle, it’s a partner in your journey. Keeping it clean should never be a burden. With us, car care becomes simple, reliable, and stress-free."
          </div>

        </div>
      </div>
    </div>
  );
}
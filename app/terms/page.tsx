import Navbar from '@/components/Navbar';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
          
          <h1 className="text-4xl font-black text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-gray-500 mb-8 font-medium">Welcome to Washee.</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Service Acceptance</h2>
              <p>By accessing our website and booking a car wash service, you agree to be bound by these Terms and Conditions. Our services are currently limited to the Guwahati region.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Booking and Cancellation</h2>
              <p>All bookings must be made through our official website. If you wish to cancel or reschedule your wash, please inform our team at least 2 hours prior to the scheduled time slot.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Payments</h2>
              <p>Currently, Washee operates on a "Payment on Service Completion" model. Customers are required to pay the full amount once the car wash is satisfactorily completed at their doorstep.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Access and Requirements</h2>
              <p>The customer must ensure that the vehicle is parked in a safe, accessible location. If parking rules in your apartment/street prohibit washing, it is the customer's responsibility to arrange an alternative spot.</p>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
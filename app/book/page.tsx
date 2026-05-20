'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import Navbar from '@/components/Navbar';

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth(); // Auth context

  const car = searchParams.get('car') || 'Hatchback';
  const planName = searchParams.get('plan') || 'Monthly (6 Services)';
  const price = searchParams.get('price') || '1499';

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: 'Guwahati',
    pincode: '',
    date: '',
    timeSlot: '',
    notes: ''
  });

  // 🚨 SECURITY: Login ke bina booking nahi ho sakti
  useEffect(() => {
    if (!authLoading && !user) {
      alert("⚠️ You must log in first to book a car wash!");
      router.push('/login'); // Login page pe dhakka maar dega
    }
  }, [user, authLoading, router]);

  // Form details auto-fill karne ke liye
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        phone: user.phone?.replace('+91', '') || ''
      }));
    }
  }, [user]);

  const timeSlots = [
    "06:00 AM - 07:00 AM", "07:00 AM - 08:00 AM", "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM", "01:00 PM - 02:00 PM", "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM", "04:00 PM - 05:00 PM"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.pincode.trim() || !formData.date || !formData.timeSlot) {
      alert('⚠️ Error: Please fill all required fields before confirming!');
      return; 
    }

    if (formData.phone.length !== 10) {
      alert('⚠️ Error: Phone number must be exactly 10 digits.');
      return;
    }

    try {
      setLoading(true);
      
      await addDoc(collection(db, 'bookings'), {
        userId: user?.uid || 'guest',
        carType: car,
        plan: planName,
        price: Number(price),
        customerDetails: formData,
        status: 'Pending', 
        paymentMethod: 'Cash on Service',
        createdAt: new Date().toISOString()
      });
      
      // Telegram Notification
      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            carType: car,
            plan: planName,
            price: price,
            customerDetails: formData
          })
        });
      } catch (botError) {
        console.error("Telegram API Error:", botError);
      }

      alert('✅ Booking Confirmed Successfully!');
      router.push('/my-bookings'); 
    } catch (error) {
      console.error("Error booking: ", error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Agar load ho raha hai ya user nahi hai toh form mat dikhao (Glitches se bachne ke liye)
  if (authLoading || !user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-xl text-blue-600">Checking Security...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* LEFT COLUMN: FORM */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Book Your Wash</h2>
              
              <form onSubmit={handleBooking} className="space-y-8">
                {/* 1. Personal Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-800 font-bold">+91</span>
                        <input required type="tel" maxLength={10} name="phone" value={formData.phone} onChange={handleInputChange} 
                          className="flex-1 w-full bg-gray-50 border border-gray-200 rounded-r-xl px-4 py-3 text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Address */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                    Service Location
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">House No / Street</label>
                      <input required type="text" name="address" value={formData.address} onChange={handleInputChange} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input required type="text" name="city" value={formData.city} readOnly 
                          className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 font-bold outline-none cursor-not-allowed" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <input required type="text" maxLength={6} name="pincode" value={formData.pincode} onChange={handleInputChange} 
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Schedule */}
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> 
                    Date & Time
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                      <input required type="date" name="date" value={formData.date} onChange={handleInputChange} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                      <select required name="timeSlot" value={formData.timeSlot} onChange={handleInputChange} 
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition">
                        <option value="" className="text-gray-500">Select a time slot</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot} className="text-gray-900 font-medium">{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition"></textarea>
                </div>

                {/* Mobile Only - Confirm Button */}
                <div className="block lg:hidden mt-8">
                  <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-extrabold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition disabled:bg-gray-400">
                    {loading ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="w-full lg:w-1/3">
            <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl text-white sticky top-24">
              <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-4">Order Summary</h3>
              
              <p className="text-gray-400 text-sm mb-1">You're booking:</p>
              <h4 className="text-2xl font-extrabold mb-6 text-blue-300">{car} - {planName}</h4>
              
              <div className="flex justify-between items-end mb-6 bg-white/10 p-4 rounded-2xl border border-white/10">
                <span className="text-gray-300 font-medium">Total Payable:</span>
                <span className="text-4xl font-black">₹{price}</span>
              </div>
              
              <div className="flex items-start gap-3 bg-blue-900/50 p-4 rounded-xl border border-blue-500/30 mb-8">
                <span className="text-xl">💰</span>
                <p className="text-sm text-blue-200 font-medium leading-relaxed">
                  Payment will be collected upon service completion.
                </p>
              </div>

              {/* Desktop Only - Confirm Button */}
              <div className="hidden lg:block">
                <button 
                  onClick={handleBooking} 
                  disabled={loading} 
                  className="w-full bg-blue-500 text-white font-extrabold py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition transform hover:-translate-y-1 disabled:bg-gray-600 disabled:shadow-none disabled:transform-none"
                >
                  {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex justify-center items-center font-bold text-xl text-blue-600">Loading your cart...</div>}>
        <BookingForm />
      </Suspense>
    </>
  );
}
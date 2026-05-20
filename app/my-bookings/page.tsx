'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// Booking ka data structure
interface Booking {
  id: string;
  carType: string;
  plan: string;
  price: number;
  status: string;
  createdAt: string;
  customerDetails: {
    date: string;
    timeSlot: string;
    address: string;
    city: string;
  };
}

export default function MyBookings() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Agar user logged in nahi hai, toh wapas login pe bhej do
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }

    const fetchBookings = async () => {
      if (user) {
        try {
          const q = query(collection(db, 'bookings'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          
          const userBookings: Booking[] = [];
          querySnapshot.forEach((doc) => {
            userBookings.push({ id: doc.id, ...doc.data() } as Booking);
          });

          // Nayi booking sabse upar dikhane ke liye sort kar rahe hain
          userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          setBookings(userBookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Bookings</h1>
            <p className="text-gray-500 mt-1">Track your car wash appointments</p>
          </div>
        </div>

        {bookings.length === 0 ? (
          // EMPTY STATE - Agar koi booking nahi hai
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-4xl mb-6">
              🚗
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No bookings yet</h3>
            <p className="text-gray-500 mb-8 max-w-md">Your car is waiting for a spa day! Book your first premium wash today.</p>
            <Link href="/" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1">
              Book a Wash Now
            </Link>
          </div>
        ) : (
          // BOOKINGS LIST
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {/* Header of the Card */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="text-blue-300 text-sm font-semibold tracking-wider uppercase mb-1 block">
                      {booking.carType}
                    </span>
                    <h3 className="text-xl font-bold text-white">{booking.plan}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-white">₹{booking.price}</span>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      booking.status === 'Pending' ? 'bg-yellow-400 text-yellow-900' :
                      booking.status === 'Completed' ? 'bg-green-400 text-green-900' :
                      'bg-red-400 text-red-900'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>

                {/* Body of the Card */}
                <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl flex-shrink-0">
                      📅
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Scheduled Date & Time</p>
                      <p className="font-bold text-gray-900">{booking.customerDetails.date}</p>
                      <p className="text-gray-600">{booking.customerDetails.timeSlot}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl flex-shrink-0">
                      📍
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">Service Location</p>
                      <p className="font-bold text-gray-900">{booking.customerDetails.address}</p>
                      <p className="text-gray-600">{booking.customerDetails.city}</p>
                    </div>
                  </div>
                </div>
                
                {/* Footer of the Card */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-sm">
                  <span className="text-gray-500">Booking ID: <span className="font-mono text-gray-900">{booking.id.slice(0, 8).toUpperCase()}</span></span>
                  <button className="text-blue-600 font-bold hover:text-blue-800 transition">Need Help?</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
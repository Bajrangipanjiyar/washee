'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Booking {
  id: string;
  carType: string;
  plan: string;
  price: number;
  status: string;
  createdAt: string;
  customerDetails: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    pincode: string;
    date: string;
    timeSlot: string;
    notes: string;
  };
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    // 🚨 SECURITY CHECK: Agar login nahi hai, ya admin nahi hai toh bahar phek do
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (user.role !== 'admin') {
        // Agar customer admin page kholne ki koshish kare
        router.push('/'); 
      } else {
        fetchAllBookings();
      }
    }
  }, [user, authLoading, router]);

  const fetchAllBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const allBookings: Booking[] = [];
      
      querySnapshot.forEach((doc) => {
        allBookings.push({ id: doc.id, ...doc.data() } as Booking);
      });

      // Sabse nayi booking sabse upar dikhane ke liye sort karna
      allBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setBookings(allBookings);
    } catch (error) {
      console.error("Error fetching all bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      setUpdatingId(bookingId);
      const bookingRef = doc(db, 'bookings', bookingId);
      await updateDoc(bookingRef, { status: newStatus });
      
      // Screen par turant update dikhane ke liye state update karna
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
      alert(`✅ Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-xl text-blue-600">Loading Dashboard...</div>;
  }

  // Agar user galti se page pe reh gaya par admin nahi hai
  if (user?.role !== 'admin') return null; 

  const totalRevenue = bookings.filter(b => b.status === 'Completed').reduce((sum, b) => sum + b.price, 0);
  const pendingOrders = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Admin Control Panel</h1>
            <p className="text-gray-500 font-medium mt-1">Manage all Washee orders in Guwahati</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-bold">Pending Orders</p>
              <p className="text-2xl font-black text-yellow-500">{pendingOrders}</p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-500 font-bold">Total Revenue</p>
              <p className="text-2xl font-black text-green-500">₹{totalRevenue}</p>
            </div>
          </div>
        </div>

        {/* ORDERS LIST */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col lg:flex-row">
              
              {/* Left Side: Order & Car Details */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 lg:w-1/3 text-white flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-blue-300 border border-white/10">
                      ID: {booking.id.slice(0, 6)}
                    </span>
                    <span className="text-2xl font-black text-white">₹{booking.price}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{booking.plan}</h3>
                  <p className="text-gray-400 font-medium">{booking.carType}</p>
                </div>
                
                <div className="mt-6">
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 block">Change Status</label>
                  <select 
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    disabled={updatingId === booking.id}
                    className={`w-full appearance-none px-4 py-3 rounded-xl font-bold border-2 cursor-pointer outline-none transition ${
                      booking.status === 'Pending' ? 'bg-yellow-400 border-yellow-500 text-yellow-900' :
                      booking.status === 'Completed' ? 'bg-green-400 border-green-500 text-green-900' :
                      'bg-red-400 border-red-500 text-red-900'
                    }`}
                  >
                    <option value="Pending">🟡 Pending</option>
                    <option value="Completed">🟢 Completed</option>
                    <option value="Cancelled">🔴 Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Right Side: Customer Details */}
              <div className="p-6 lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Customer Info */}
                <div>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Customer Details</h4>
                  <p className="font-bold text-gray-900 text-lg">{booking.customerDetails.fullName}</p>
                  <p className="text-blue-600 font-bold mt-1 text-lg">📞 +91 {booking.customerDetails.phone}</p>
                </div>

                {/* Date & Time */}
                <div>
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Schedule</h4>
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <span>📅</span> {booking.customerDetails.date}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 font-medium mt-1">
                    <span>⏰</span> {booking.customerDetails.timeSlot}
                  </div>
                </div>

                {/* Address */}
                <div className="sm:col-span-2 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">Service Location</h4>
                  <p className="font-bold text-gray-900">{booking.customerDetails.address}</p>
                  <p className="text-gray-600 font-medium">{booking.customerDetails.city} - {booking.customerDetails.pincode}</p>
                </div>

                {/* Notes */}
                {booking.customerDetails.notes && (
                  <div className="sm:col-span-2">
                    <p className="text-sm font-bold text-gray-500 mb-1">Notes:</p>
                    <p className="text-gray-700 bg-yellow-50 p-3 rounded-xl border border-yellow-100 text-sm italic">
                      "{booking.customerDetails.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {bookings.length === 0 && (
             <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
               <p className="text-gray-500 font-bold text-xl">No orders received yet.</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
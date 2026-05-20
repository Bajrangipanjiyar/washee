'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logOut } = useAuth(); // Exact logOut variable match ho raha hai

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
              Washee
            </span>
          </Link>

          {/* RIGHT SIDE BUTTONS (Direct mobile pe dikhenge bina kisii toggle ke) */}
          <div className="flex items-center gap-3 md:gap-6">
            {user ? (
              <>
                <Link href="/my-bookings" className="text-sm font-extrabold text-gray-700 hover:text-blue-600 transition">
                  My Orders
                </Link>
                <button 
                  onClick={logOut}
                  className="bg-red-50 border border-red-100 text-red-600 px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold hover:bg-red-500 hover:text-white transition shadow-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-5 md:px-6 py-2 rounded-full text-sm font-bold hover:bg-blue-700 transition shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
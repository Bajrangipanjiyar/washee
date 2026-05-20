'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-extrabold text-blue-600">
              Washee
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/plans" className="text-gray-700 hover:text-blue-600 font-medium">Plans</Link>
            
            {/* Agar loading chal rahi hai toh kuch mat dikhao */}
            {!loading && (
              <>
                {user ? (
                  // User Logged In Hai
                  <div className="flex items-center space-x-6">
                    <Link href="/my-bookings" className="text-gray-700 hover:text-blue-600 font-medium">
                      My Bookings
                    </Link>
                    <span className="text-sm text-gray-500">Hi, {user.name || 'User'}</span>
                    <button 
                      onClick={handleLogout}
                      className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  // User Logged Out Hai
                  <Link href="/login">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                      Login
                    </button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Menu Button - Abhi ke liye simple */}
          <div className="md:hidden flex items-center">
             {!loading && !user && (
               <Link href="/login" className="mr-4 text-blue-600 font-medium">Login</Link>
             )}
            <button className="text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
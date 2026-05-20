'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const [carType, setCarType] = useState<'HATCHBACK' | 'LUXURY' | 'SUV'>('HATCHBACK');

  // Pricing Data structure
  const pricing = {
    HATCHBACK: { basic: 199, premium: 399, sub: 1099 },
    LUXURY: { basic: 299, premium: 499, sub: 1299 },
    SUV: { basic: 399, premium: 599, sub: 1499 }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-blue-200">
      <Navbar />

      {/* HERO SECTION - Ultra Premium Glassmorphism */}
      <section className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-black text-white pt-24 pb-32 px-4 overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-0 right-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* DYNAMIC TOP BUTTON - Orders dikhane ke liye */}
          {user ? (
            <Link href="/my-bookings" className="group inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-blue-50 px-6 py-2.5 rounded-full text-sm font-semibold mb-8 hover:bg-white/20 hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Track Your Bookings, {user.name?.split(' ')[0] || 'Buddy'}! <span className="group-hover:translate-x-1 transition-transform">➔</span>
            </Link>
          ) : (
            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 px-5 py-2 rounded-full text-sm font-semibold mb-8 shadow-sm">
              📍 Exclusive Doorstep Service in Guwahati
            </div>
          )}

          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-2xl">
            Showroom Shine. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-100">
              Zero Effort.
            </span>
          </h1>
          <p className="text-lg md:text-xl mb-12 text-blue-100/80 max-w-2xl mx-auto font-light leading-relaxed px-4">
            Skip the traffic. Book Washee and let our experts pamper your car at your doorstep in under 45 minutes.
          </p>
          <div className="flex flex-col w-full sm:w-auto sm:flex-row justify-center gap-4 px-4">
            <a href="#plans" className="w-full sm:w-auto text-center bg-white text-blue-900 font-extrabold py-4 px-10 rounded-2xl md:rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition transform hover:-translate-y-1">
              View Plans
            </a>
          </div>
        </div>
      </section>

      {/* DYNAMIC PLANS SECTION */}
      <section id="plans" className="py-20 px-4 max-w-7xl mx-auto -mt-12 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-6 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Choose Your Wash</h2>
            <p className="text-gray-500 text-lg">Select your car type for the best prices in town.</p>
          </div>

          {/* iOS Style Car Type Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-1.5 rounded-2xl md:rounded-full w-full md:w-auto inline-flex flex-col md:flex-row justify-center gap-2 relative">
              {['HATCHBACK', 'LUXURY', 'SUV'].map((type) => (
                <button
                  key={type}
                  onClick={() => setCarType(type as any)}
                  className={`w-full md:w-48 px-6 py-4 md:py-3 rounded-xl md:rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                    carType === type 
                      ? 'bg-white text-blue-600 shadow-md transform scale-100' 
                      : 'text-gray-500 hover:text-gray-800 bg-transparent'
                  }`}
                >
                  {type === 'LUXURY' ? 'SEDAN / LUXURY' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Basic Card */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-blue-300 transition-all hover:shadow-xl relative flex flex-col">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Basic Wash</h3>
              <p className="text-gray-500 text-sm mb-8 h-10">Perfect for a quick, essential cleanup.</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black text-gray-900">₹{pricing[carType].basic}</span>
              </div>
              <ul className="space-y-4 mb-10 text-gray-600 font-medium flex-grow">
                <li className="flex items-center gap-3"><span className="text-green-500 bg-green-50 p-1 rounded-full">✔</span> Interior & Exterior Cleaning</li>
                <li className="flex items-center gap-3"><span className="text-green-500 bg-green-50 p-1 rounded-full">✔</span> Dashboard Wiping</li>
                <li className="flex items-center gap-3 text-blue-600 font-bold"><span className="text-xl">✨</span> No Visit Charge</li>
              </ul>
              <Link href={`/book?car=${carType}&plan=Basic Wash&price=${pricing[carType].basic}`} className="w-full text-center block bg-blue-50 border border-blue-100 text-blue-700 font-bold py-4 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                Select Basic
              </Link>
            </div>

            {/* Premium Card */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-900 rounded-3xl p-8 shadow-2xl transform lg:-translate-y-6 relative flex flex-col border border-blue-500">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 px-6 py-1.5 rounded-full text-xs md:text-sm font-extrabold shadow-lg tracking-wider">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 mt-4 lg:mt-0">Premium Wash</h3>
              <p className="text-blue-200 text-sm mb-8 h-10">Ultimate care. Showroom shine at your door.</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">₹{pricing[carType].premium}</span>
                <span className="text-blue-300 line-through text-lg font-medium">₹{pricing[carType].premium + 100}</span>
              </div>
              <ul className="space-y-4 mb-10 text-white font-medium flex-grow">
                <li className="flex items-center gap-3"><span className="text-yellow-400 bg-white/10 p-1 rounded-full">✔</span> Everything in Basic</li>
                <li className="flex items-center gap-3"><span className="text-yellow-400 bg-white/10 p-1 rounded-full">✔</span> Deep Dashboard Polish</li>
                <li className="flex items-center gap-3"><span className="text-yellow-400 bg-white/10 p-1 rounded-full">✔</span> Tyre Polish & Shine</li>
              </ul>
              <Link href={`/book?car=${carType}&plan=Premium Wash&price=${pricing[carType].premium}`} className="w-full text-center block bg-white text-blue-800 font-extrabold py-4 rounded-2xl shadow-xl hover:bg-gray-100 transition transform hover:scale-[1.02]">
                Book Premium
              </Link>
            </div>

            {/* Subscription Card */}
            <div className="bg-gray-900 rounded-3xl p-8 shadow-xl relative flex flex-col border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">Monthly Sub</h3>
              <p className="text-gray-400 text-sm mb-8 h-10">4 Washes a month. Zero tension.</p>
              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">₹{pricing[carType].sub}</span>
                <span className="text-gray-500 text-lg">/mo</span>
              </div>
              <ul className="space-y-4 mb-10 text-gray-300 font-medium flex-grow">
                <li className="flex items-center gap-3"><span className="text-blue-400 bg-blue-400/10 p-1 rounded-full">✔</span> 2x Exterior Washes</li>
                <li className="flex items-center gap-3"><span className="text-blue-400 bg-blue-400/10 p-1 rounded-full">✔</span> 2x Full Premium Washes</li>
                <li className="flex items-center gap-3 text-green-400 font-bold"><span className="text-xl">💰</span> Save upto ₹500/mo</li>
              </ul>
              <Link href={`/book?car=${carType}&plan=Monthly Subscription (4 Washes)&price=${pricing[carType].sub}`} className="w-full text-center block bg-gray-800 border border-gray-700 text-white font-bold py-4 rounded-2xl hover:bg-gray-700 hover:border-gray-500 transition-all">
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Premium Version */}
      <section className="bg-white py-24 px-4 border-t border-gray-100 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">3 Steps to a Shining Car</h2>
          <p className="text-gray-500 text-lg mb-16 max-w-2xl mx-auto">We've simplified car care. No more waiting in lines or wasting your weekend.</p>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connector Line for Desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] w-[70%] h-1 bg-gradient-to-r from-blue-100 via-blue-400 to-blue-100 z-0"></div>
            
            {[
              { step: '01', title: 'Book Online', desc: 'Select your car type, pick a plan, and choose a time slot that works for you.' },
              { step: '02', title: 'We Arrive', desc: 'Our trained professionals arrive at your doorstep in Guwahati with premium equipment.' },
              { step: '03', title: 'Relax & Smile', desc: 'Sit back while we transform your car. Pay only when you are 100% satisfied.' }
            ].map((item, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg mb-6 shadow-blue-500/30">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-white tracking-tight mb-2">Washee</h2>
            <p className="text-sm">Premium Doorstep Car Wash in Guwahati</p>
          </div>
          
          {/* NAYE LINKS YAHAN HAIN */}
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm font-medium">
            <Link href="/about" className="hover:text-white transition">About Us</Link>
            <Link href="/terms" className="hover:text-white transition">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link>
            
            {/* 🚨 ADMIN BUTTON - Sirf tab dikhega jab user.role === 'admin' ho */}
            {user?.role === 'admin' && (
              <Link href="/admin" className="bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-4 py-1.5 rounded-full transition font-bold border border-red-500/30 flex items-center gap-2">
                ⚙️ Admin Panel
              </Link>
            )}
          </div>

          <div className="text-center md:text-right">
            <p className="mb-2 font-bold text-white text-lg">+91 6003151047</p>
            <p className="text-sm">© 2026 Washee. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
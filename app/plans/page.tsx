'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function PlansPage() {
  const [activeTab, setActiveTab] = useState<'ONETIME' | 'SUB6' | 'SUB4'>('ONETIME');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Our Plans</h1>
          <p className="text-gray-600 mt-2">Choose the perfect wash for your car.</p>
        </div>

        {/* Mobile Friendly Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar justify-start md:justify-center">
          <div className="flex space-x-2 bg-gray-200 p-1 rounded-xl whitespace-nowrap">
            <button
              onClick={() => setActiveTab('ONETIME')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'ONETIME' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              One-Time Wash
            </button>
            <button
              onClick={() => setActiveTab('SUB4')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'SUB4' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Monthly (4 Washes)
            </button>
            <button
              onClick={() => setActiveTab('SUB6')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === 'SUB6' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Monthly (6 Washes)
            </button>
          </div>
        </div>

        {/* Plans Grid - Mobile pe ek ke neeche ek, Laptop pe 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Hatchback Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-blue-50 p-4 border-b border-gray-100 text-center">
              <h2 className="text-xl font-bold text-gray-900">Hatchback</h2>
            </div>
            <div className="p-6 flex-grow flex flex-col gap-6">
              {activeTab === 'ONETIME' && (
                <>
                  {/* Basic */}
                  <div className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">Basic Wash</h3>
                      <div className="text-right">
                        <span className="text-sm text-gray-400 line-through mr-2">₹299</span>
                        <span className="text-lg font-bold text-green-600">₹199</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      <li>✓ Interior & exterior</li>
                      <li className="text-blue-600 font-medium">✓ Visit Charge Free</li>
                    </ul>
                    <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-100 transition">Book Basic</button>
                  </div>
                  {/* Premium */}
                  <div className="border border-blue-100 bg-blue-50/30 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">Premium Wash</h3>
                      <div className="text-right">
                        <span className="text-sm text-gray-400 line-through mr-2">₹499</span>
                        <span className="text-lg font-bold text-green-600">₹399</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      <li>✓ Interior & exterior</li>
                      <li>✓ Dashboard polish</li>
                      <li>✓ Tyre polish</li>
                      <li className="text-blue-600 font-medium">✓ Visit Charge Free</li>
                    </ul>
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Book Premium</button>
                  </div>
                </>
              )}
              
              {activeTab === 'SUB4' && (
                 <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-4">
                        <span className="text-sm text-gray-400 line-through">₹1599</span>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900">₹1099</span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 mb-6 space-y-2">
                        <li>✓ 2x exterior wash</li>
                        <li>✓ 2x interior+exterior + polish</li>
                        <li className="text-blue-600 font-medium">✓ Visit Charge Free</li>
                      </ul>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Subscribe Now</button>
                 </div>
              )}

              {activeTab === 'SUB6' && (
                 <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-4">
                        <span className="text-sm text-gray-400 line-through">₹1999</span>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900">₹1499</span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 mb-6 space-y-2">
                        <li>✓ 2x exterior wash</li>
                        <li>✓ 4x interior+exterior + polish</li>
                        <li className="text-blue-600 font-medium">✓ Visit Charge Free</li>
                      </ul>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Subscribe Now</button>
                 </div>
              )}
            </div>
          </div>

          {/* Sedan/Luxury Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col relative">
             {/* Optional Badge for Luxury */}
             <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
            <div className="bg-blue-50 p-4 border-b border-gray-100 text-center">
              <h2 className="text-xl font-bold text-gray-900">Luxury Cars</h2>
            </div>
            <div className="p-6 flex-grow flex flex-col gap-6">
              {activeTab === 'ONETIME' && (
                <>
                  <div className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">Basic Wash</h3>
                      <div className="text-right">
                        <span className="text-sm text-gray-400 line-through mr-2">₹499</span>
                        <span className="text-lg font-bold text-green-600">₹299</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      <li>✓ Interior & exterior</li>
                      <li className="text-blue-600 font-medium">✓ Visit Charge Free</li>
                    </ul>
                    <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-100 transition">Book Basic</button>
                  </div>
                  <div className="border border-blue-100 bg-blue-50/30 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">Premium Wash</h3>
                      <div className="text-right">
                        <span className="text-sm text-gray-400 line-through mr-2">₹699</span>
                        <span className="text-lg font-bold text-green-600">₹499</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      <li>✓ Interior & exterior</li>
                      <li>✓ Dashboard polish</li>
                      <li>✓ Tyre polish</li>
                      <li className="text-blue-600 font-medium">✓ Visit Charge Free</li>
                    </ul>
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Book Premium</button>
                  </div>
                </>
              )}
              {/* Add SUB4 and SUB6 logic for Luxury similar to Hatchback with updated prices (1299/2099) */}
              {activeTab === 'SUB4' && (
                 <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-4">
                        <span className="text-sm text-gray-400 line-through">₹1799</span>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900">₹1299</span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 mb-6 space-y-2">
                        <li>✓ 2x exterior wash</li>
                        <li>✓ 2x interior+exterior + polish</li>
                      </ul>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Subscribe Now</button>
                 </div>
              )}
               {activeTab === 'SUB6' && (
                 <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-4">
                        <span className="text-sm text-gray-400 line-through">₹2599</span>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900">₹2099</span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 mb-6 space-y-2">
                        <li>✓ 2x exterior wash</li>
                        <li>✓ 4x interior+exterior + polish</li>
                      </ul>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Subscribe Now</button>
                 </div>
              )}
            </div>
          </div>

          {/* SUV Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="bg-blue-50 p-4 border-b border-gray-100 text-center">
              <h2 className="text-xl font-bold text-gray-900">SUV</h2>
            </div>
            <div className="p-6 flex-grow flex flex-col gap-6">
               {activeTab === 'ONETIME' && (
                <>
                  <div className="border border-gray-100 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">Basic Wash</h3>
                      <div className="text-right">
                        <span className="text-sm text-gray-400 line-through mr-2">₹599</span>
                        <span className="text-lg font-bold text-green-600">₹399</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      <li>✓ Interior & exterior</li>
                      <li className="text-blue-600 font-medium">✓ Visit Charge Free</li>
                    </ul>
                    <button className="w-full bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-100 transition">Book Basic</button>
                  </div>
                  <div className="border border-blue-100 bg-blue-50/30 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-800">Premium Wash</h3>
                      <div className="text-right">
                        <span className="text-sm text-gray-400 line-through mr-2">₹799</span>
                        <span className="text-lg font-bold text-green-600">₹599</span>
                      </div>
                    </div>
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      <li>✓ Interior & exterior</li>
                      <li>✓ Dashboard polish</li>
                      <li>✓ Tyre polish</li>
                    </ul>
                    <button className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">Book Premium</button>
                  </div>
                </>
              )}
              {/* Subscriptions for SUV (1499/2599) */}
               {activeTab === 'SUB4' && (
                 <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-4">
                        <span className="text-sm text-gray-400 line-through">₹1999</span>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900">₹1499</span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 mb-6 space-y-2">
                        <li>✓ 2x exterior wash</li>
                        <li>✓ 2x interior+exterior + polish</li>
                      </ul>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Subscribe Now</button>
                 </div>
              )}
               {activeTab === 'SUB6' && (
                 <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-4">
                        <span className="text-sm text-gray-400 line-through">₹3099</span>
                        <div className="text-right">
                          <span className="text-3xl font-bold text-gray-900">₹2599</span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </div>
                      </div>
                      <ul className="text-sm text-gray-600 mb-6 space-y-2">
                        <li>✓ 2x exterior wash</li>
                        <li>✓ 4x interior+exterior + polish</li>
                      </ul>
                    </div>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">Subscribe Now</button>
                 </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
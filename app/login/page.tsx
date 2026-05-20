'use client';

import { useState, useRef, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// TypeScript Error Fix: Window object me recaptchaVerifier define kiya
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export default function PremiumLogin() {
  const router = useRouter();
  
  // States
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState<'PHONE' | 'OTP' | 'PROFILE'>('PHONE');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const recaptchaResolved = useRef(false);

  // Next.js Strict Mode aur reCAPTCHA fix
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          recaptchaResolved.current = true;
          console.log('Recaptcha Verified');
        },
        'expired-callback': () => {
          recaptchaResolved.current = false;
        }
      });
    }
  };

  const sendOtp = async () => {
    try {
      setLoading(true); 
      setError('');
      
      // Har baar clear karke naya banayenge taaki purana token clash na kare
      if (window.recaptchaVerifier) {
         window.recaptchaVerifier.clear();
         window.recaptchaVerifier = null;
      }
      setupRecaptcha();
      
      const formattedNumber = `+91${phoneNumber}`; 
      const appVerifier = window.recaptchaVerifier;
      
      const result = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      setConfirmationResult(result);
      setStep('OTP');
    } catch (err: any) {
      console.error("Firebase Error details:", err);
      // Clean up on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      setError('Error: Please check Firebase Console settings (Phone enabled & Localhost added).');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true); 
      setError('');
      
      if (confirmationResult) {
        const result = await confirmationResult.confirm(otp);
        const user = result.user;
        
        // Check if user exists in Database
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          // Purana user hai -> Direct Home Page
          router.push('/');
        } else {
          // Naya user hai -> Profile step pe le jao
          setStep('PROFILE');
        }
      }
    } catch (err: any) {
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setLoading(true); 
      setError('');
      
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          phone: user.phoneNumber,
          name: name,
          createdAt: new Date().toISOString(),
          role: 'customer'
        });
        // Profile save hote hi Home Page
        router.push('/');
      }
    } catch (err: any) {
      setError('Could not save profile. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-30"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="text-center">
          <Link href="/">
            <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 tracking-tight cursor-pointer">
              Washee
            </h2>
          </Link>
          <p className="mt-3 text-gray-300 text-sm tracking-wide uppercase font-medium">Premium Doorstep Care</p>
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-xl border border-white/20 py-8 px-6 shadow-2xl rounded-3xl sm:px-10">
          <h3 className="text-2xl font-semibold text-white text-center mb-6">
            {step === 'PHONE' && 'Welcome Back'}
            {step === 'OTP' && 'Verify Number'}
            {step === 'PROFILE' && 'Almost There!'}
          </h3>
          
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl text-sm text-center backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* STEP 1: PHONE NUMBER */}
          {step === 'PHONE' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Enter your mobile number</label>
                <div className="flex bg-white/5 border border-white/20 rounded-xl overflow-hidden focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
                  <span className="flex items-center justify-center px-4 bg-white/10 text-white font-medium">
                    +91
                  </span>
                  <input
                    type="tel" maxLength={10}
                    value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 w-full bg-transparent text-white px-4 py-4 focus:outline-none text-lg tracking-wide placeholder-gray-500"
                    placeholder="99999 99999"
                  />
                </div>
              </div>
              <button
                onClick={sendOtp} disabled={loading || phoneNumber.length !== 10}
                className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg text-md font-bold text-blue-900 bg-gradient-to-r from-blue-400 to-blue-200 hover:from-blue-300 hover:to-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
              >
                {loading ? 'Sending Secure OTP...' : 'Get OTP'}
              </button>
            </div>
          )}

          {/* STEP 2: OTP */}
          {step === 'OTP' && (
            <div className="space-y-6 flex flex-col items-center">
              <p className="text-sm text-gray-300 text-center">Enter the 6-digit code sent to <br/><span className="text-white font-bold tracking-wider">+91 {phoneNumber}</span></p>
              <div className="w-full">
                <input
                  type="text" maxLength={6}
                  value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="block w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-center text-3xl tracking-[0.5em] font-bold text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all placeholder-gray-600"
                  placeholder="------"
                />
              </div>
              <button
                onClick={verifyOtp} disabled={loading || otp.length !== 6}
                className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg text-md font-bold text-blue-900 bg-gradient-to-r from-green-400 to-green-200 hover:from-green-300 hover:to-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
              >
                {loading ? 'Verifying...' : 'Secure Login'}
              </button>
              <button onClick={() => setStep('PHONE')} className="text-sm text-blue-300 font-medium hover:text-white transition-colors">
                Edit Phone Number
              </button>
            </div>
          )}

          {/* STEP 3: PROFILE */}
          {step === 'PROFILE' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">What should we call you?</label>
                <input
                  type="text"
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="block w-full bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all placeholder-gray-500"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <button
                onClick={saveProfile} disabled={loading || name.trim().length < 2}
                className="w-full flex justify-center py-4 px-4 rounded-xl shadow-lg text-md font-bold text-blue-900 bg-gradient-to-r from-blue-400 to-blue-200 hover:from-blue-300 hover:to-white focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-[0.98]"
              >
                {loading ? 'Setting up...' : 'Start Booking'}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Invisible Recaptcha Container */}
      <div id="recaptcha-container" className="hidden"></div>
    </div>
  );
}
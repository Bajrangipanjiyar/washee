'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  type User,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult
} from 'firebase/auth';
import { auth, createUserInFirestore } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface CustomerAuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult | undefined>;
  confirmOtp: (confirmationResult: ConfirmationResult, otp: string) => Promise<void>;
  logout: () => Promise<void>;
}

const CustomerAuthContext = createContext<CustomerAuthContextType | undefined>(undefined);

export function CustomerAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await createUserInFirestore(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const setupRecaptcha = () => {
    if (typeof window !== 'undefined' && (window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier.clear();
    }
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response: any) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    });
    (window as any).recaptchaVerifier = recaptchaVerifier;
    return recaptchaVerifier;
  }

  const signInWithPhone = async (phoneNumber: string) => {
    const appVerifier = setupRecaptcha();
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      return confirmationResult;
    } catch (error: any) {
      console.error("Phone sign-in error:", error);
      toast({ variant: 'destructive', title: 'Login Failed', description: error.message || 'Could not send OTP. Please try again.' });
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
      }
    }
  }
  
  const confirmOtp = async (confirmationResult: ConfirmationResult, otp: string) => {
      try {
        const result = await confirmationResult.confirm(otp);
        await createUserInFirestore(result.user);
      } catch (error: any) {
         console.error("OTP confirmation error:", error);
         toast({ variant: 'destructive', title: 'OTP Invalid', description: error.message || 'The OTP you entered is incorrect.' });
         throw error;
      }
  }


  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserInFirestore(result.user);
      // toast is shown in the component
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({ variant: 'destructive', title: 'Login Failed', description: 'Could not sign in with Google.' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/');
    } catch (error) {
        console.error("Logout error:", error);
        toast({ variant: 'destructive', title: 'Logout Failed', description: 'Could not log out.' });
    }
  };

  const value = { user, loading, signInWithGoogle, signInWithPhone, confirmOtp, logout };

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
}

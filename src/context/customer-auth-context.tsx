'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, type User } from 'firebase/auth';
import { auth, createUserInFirestore } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface CustomerAuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserInFirestore(result.user);
      toast({ title: 'Login Successful!' });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({ variant: 'destructive', title: 'Login Failed', description: 'Could not sign in with Google.' });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push('/login');
    } catch (error) {
        console.error("Logout error:", error);
        toast({ variant: 'destructive', title: 'Logout Failed', description: 'Could not log out.' });
    }
  };

  const value = { user, loading, signInWithGoogle, logout };

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);
  if (context === undefined) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return context;
}

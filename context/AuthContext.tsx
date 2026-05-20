'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// User structure for TypeScript
interface AuthUser {
  uid: string;
  email: string | null;
  name?: string;
  phone?: string;
  role?: string;
}

// 1. Context Type me logOut ko compulsory kiya
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Firebase auth ke sath-sath Firestore se role aur extra details nikalna
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: userData.name || userData.fullName || firebaseUser.displayName || 'Washee Buddy',
              phone: userData.phone || firebaseUser.phoneNumber || '',
              role: userData.role || 'customer', // Agar role nahi hai toh default customer
            });
          } else {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              role: 'customer',
            });
          }
        } catch (error) {
          console.error("Firestore user detail fetch error:", error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            role: 'customer',
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Logout function jo hum Navbar me call karenge
  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
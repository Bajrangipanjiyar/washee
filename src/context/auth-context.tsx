'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_USERNAME = 'Bajrangi';
const ADMIN_PASSWORD = '847222';
const AUTH_KEY = 'washy-admin-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedAuth = sessionStorage.getItem(AUTH_KEY);
      if (storedAuth) {
        const { username, password, expiry } = JSON.parse(storedAuth);
        if (
          new Date().getTime() < expiry &&
          username === ADMIN_USERNAME &&
          password === ADMIN_PASSWORD
        ) {
          setIsAuthenticated(true);
        } else {
          sessionStorage.removeItem(AUTH_KEY);
        }
      }
    } catch (error) {
        console.error("Could not parse auth key", error);
        sessionStorage.removeItem(AUTH_KEY);
    }
    setLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const expiry = new Date().getTime() + 8 * 60 * 60 * 1000; // 8 hours
      sessionStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD, expiry })
      );
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  const value = { isAuthenticated, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

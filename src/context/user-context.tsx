'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Customer } from '@/types';

interface UserContextType {
  user: Customer | null;
  loading: boolean;
  login: (userData: Customer) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
        const storedUser = localStorage.getItem('customer');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
    } catch (error) {
        console.error("Could not parse user from localStorage", error)
    }
    setLoading(false);
  }, []);

  const login = (userData: Customer) => {
    localStorage.setItem('customer', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('customer');
    setUser(null);
  };

  const value = { user, loading, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

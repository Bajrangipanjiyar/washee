import type { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  role: 'user' | 'admin';
  createdAt: Timestamp;
}

export interface Plan {
  carType: string;
  price?: number;
  split?: {
    exterior: number;
    full: number;
  };
  basic?: number;
  premium?: number;
}

export type PlanGroup = 'monthly' | 'monthly4' | 'onetime';
export type CarType = 'hatchback' | 'luxury' | 'suv';
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type OnetimeVariant = 'basic' | 'premium';


export interface Booking {
  id: string;
  userId: string;
  userPhone: string;
  userName?: string;
  planGroup: PlanGroup;
  carType: CarType;
  variant?: OnetimeVariant | 'full' | 'exterior-only';
  price: number;
  address: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: BookingStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

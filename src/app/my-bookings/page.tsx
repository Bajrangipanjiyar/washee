'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';

import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import type { Booking, BookingStatus } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const statusColors: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
  completed: 'bg-green-100 text-green-800 border-green-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
};

function BookingItem({ booking }: { booking: Booking }) {
  const planName = `${booking.carType.charAt(0).toUpperCase() + booking.carType.slice(1)} - ${booking.planGroup === 'onetime' ? `One-Time ${booking.variant}` : 'Monthly'}`;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">{planName}</CardTitle>
              <CardDescription>
                Booked on: {format(booking.createdAt.toDate(), 'PPP')}
              </CardDescription>
            </div>
             <Badge className={cn("capitalize", statusColors[booking.status])}>{booking.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p><strong>Service Date:</strong> {format(new Date(booking.date), 'PPP')} at {booking.timeSlot}</p>
        <p><strong>Address:</strong> {booking.address}</p>
        <p className="font-bold text-lg mt-2">Price: ₹{booking.price}</p>
      </CardContent>
    </Card>
  );
}

export default function MyBookingsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login?redirect=/my-bookings');
      return;
    }

    const q = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userBookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Booking));
      setBookings(userBookings);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
        <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 font-headline">My Bookings</h1>
      {bookings.length > 0 ? (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">No bookings yet!</h2>
            <p className="text-muted-foreground mt-2">Ready for a sparkling clean car?</p>
            <Button asChild className="mt-4">
                <a href="/plans">View Plans & Book Now</a>
            </Button>
        </div>
      )}
    </div>
  );
}



'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs, type Timestamp, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';

import { db } from '@/lib/firebase';
import type { Booking, BookingStatus, PaymentMethod } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useCustomerAuth } from '@/context/customer-auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const statusColors: Record<BookingStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

const paymentMethodColors: Record<PaymentMethod, string> = {
    online: 'bg-purple-100 text-purple-800',
    cash: 'bg-orange-100 text-orange-800',
}

export default function MyBookingsPage() {
  const { toast } = useToast();
  const { user: customerUser, loading: customerLoading } = useCustomerAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (customerLoading) return;
    if (!customerUser) {
      router.push('/login?redirect=/my-bookings');
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      if (!customerUser) {
        setBookings([]);
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'bookings'),
          where('userId', '==', customerUser.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const foundBookings = querySnapshot.docs.map(doc => {
          const data = doc.data() as Omit<Booking, 'id' | 'date' | 'createdAt' | 'updatedAt'>;
          const bookingDate = (doc.data().date as Timestamp)?.toDate ? (doc.data().date as Timestamp).toDate() : new Date();
          const createdAtDate = (doc.data().createdAt as Timestamp)?.toDate ? (doc.data().createdAt as Timestamp).toDate() : new Date();
          const updatedAtDate = (doc.data().updatedAt as Timestamp)?.toDate ? (doc.data().updatedAt as Timestamp).toDate() : new Date();
          
          return {
              ...data,
              id: doc.id,
              date: bookingDate,
              createdAt: createdAtDate,
              updatedAt: updatedAtDate,
          } as Booking
        });

        setBookings(foundBookings);
      } catch (error) {
          if ((error as any).code === 'failed-precondition') {
              toast({ variant: 'destructive', title: 'Database Index Required', description: 'Please create a composite index in Firestore for userId and createdAt.' });
          } else {
              console.error("Error fetching bookings:", error);
              toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch bookings.' });
          }
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();

  }, [customerUser, customerLoading, toast, router]);

  if (customerLoading || loading) {
    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
            <Card>
                <CardContent className="p-6">
                    <Skeleton className="h-8 w-1/4 mb-4" />
                    <Skeleton className="h-40 w-full" />
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <>
        <Navbar />
        <main className="flex-grow">
            <div className="container py-12">
              <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
              <Card>
                  <CardContent className="p-6">
                      {bookings.length > 0 ? (
                      <Table>
                          <TableHeader>
                          <TableRow>
                              <TableHead>Service Date</TableHead>
                              <TableHead>Plan</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Payment</TableHead>
                              <TableHead>Status</TableHead>
                          </TableRow>
                          </TableHeader>
                          <TableBody>
                          {bookings.map((booking) => (
                              <TableRow key={booking.id}>
                                  <TableCell>
                                      {format(booking.date, 'dd MMM yyyy')}
                                      <div className="text-sm text-muted-foreground">{booking.timeSlot}</div>
                                  </TableCell>
                                  <TableCell>{booking.carType} ({booking.planGroup})</TableCell>
                                  <TableCell>₹{booking.price}</TableCell>
                                  <TableCell>
                                      <Badge className={cn("capitalize", paymentMethodColors[booking.paymentMethod as keyof typeof paymentMethodColors])} variant="outline">
                                          {booking.paymentMethod}
                                      </Badge>
                                  </TableCell>
                                  <TableCell>
                                      <Badge className={cn("capitalize", statusColors[booking.status as keyof typeof statusColors])} variant="outline">
                                          {booking.status}
                                      </Badge>
                                  </TableCell>
                              </TableRow>
                          ))}
                          </TableBody>
                      </Table>
                      ) : (
                      <div className="text-center py-8 text-muted-foreground">
                          <p>You haven't made any bookings yet.</p>
                          <Button asChild variant="link" className="mt-2">
                            <a href="/plans">Book a wash</a>
                          </Button>
                      </div>
                      )}
                  </CardContent>
              </Card>
            </div>
        </main>
        <Footer />
    </>
  );
}

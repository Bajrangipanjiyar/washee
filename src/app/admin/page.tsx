'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, type Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

import { db } from '@/lib/firebase';
import type { Booking, BookingStatus } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';


const statusColors: Record<BookingStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-green-100 text-green-800 border-green-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300',
};


function StatusSelector({ booking }: { booking: Booking }) {
    const { toast } = useToast();
    const [isUpdating, setIsUpdating] = useState(false);
  
    const handleStatusChange = async (newStatus: BookingStatus) => {
      setIsUpdating(true);
      try {
        const bookingRef = doc(db, 'bookings', booking.id);
        await updateDoc(bookingRef, {
          status: newStatus,
          updatedAt: new Date(),
        });
        toast({ title: 'Status updated successfully!' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to update status.' });
        console.error("Failed to update status:", error);
      } finally {
        setIsUpdating(false);
      }
    };
  
    return (
      <Select onValueChange={handleStatusChange} defaultValue={booking.status} disabled={isUpdating}>
        <SelectTrigger className={cn("w-36 capitalize", statusColors[booking.status])}>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
            {(['pending', 'confirmed', 'completed', 'cancelled'] as BookingStatus[]).map(status => (
                <SelectItem key={status} value={status} className="capitalize">{status}</SelectItem>
            ))}
        </SelectContent>
      </Select>
    );
  }

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allBookings = snapshot.docs.map(doc => {
        const data = doc.data();
        const bookingDate = (data.date as Timestamp)?.toDate ? (data.date as Timestamp).toDate() : new Date();
        return {
            id: doc.id,
            ...data,
            date: bookingDate,
        } as Booking
      });
      setBookings(allBookings);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || loading) {
    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8 font-headline">Admin Dashboard</h1>
            <Skeleton className="h-[500px] w-full" />
        </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Service Date</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                    <div className="font-medium">{booking.userName || 'N/A'}</div>
                    <div className="text-sm text-muted-foreground">{booking.userPhone}</div>
                </TableCell>
                <TableCell>
                    {format(booking.date, 'dd MMM yyyy')}
                    <div className="text-sm text-muted-foreground">{booking.timeSlot}</div>
                </TableCell>
                <TableCell>{booking.carType} ({booking.planGroup})</TableCell>
                <TableCell>{booking.price}</TableCell>
                <TableCell>
                  <StatusSelector booking={booking} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {bookings.length === 0 && !loading && <p className="p-8 text-center text-muted-foreground">No bookings found.</p>}
      </Card>
    </div>
  );
}

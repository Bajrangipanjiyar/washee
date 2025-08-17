'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { format } from 'date-fns';

import { useAuth } from '@/context/auth-context';
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
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';


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
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.role !== 'admin') {
      router.push('/my-bookings');
      return;
    }

    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allBookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      } as Booking));
      setBookings(allBookings);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, authLoading, router]);

  if (authLoading || loading) {
    return (
        <div className="container py-12">
            <h1 className="text-3xl font-bold mb-8 font-headline">Admin Dashboard</h1>
            <Skeleton className="h-[500px] w-full" />
        </div>
    );
  }
  
  if (user?.role !== 'admin') {
    return <div className="container py-12 text-center"><p>Access Denied.</p></div>
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 font-headline">Admin Dashboard</h1>
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
                    {format(new Date(booking.date), 'dd MMM yyyy')}
                    <div className="text-sm text-muted-foreground">{booking.timeSlot}</div>
                </TableCell>
                <TableCell>{booking.carType} ({booking.planGroup})</TableCell>
                <TableCell>₹{booking.price}</TableCell>
                <TableCell>
                  <StatusSelector booking={booking} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {bookings.length === 0 && <p className="p-8 text-center text-muted-foreground">No bookings found.</p>}
      </Card>
    </div>
  );
}

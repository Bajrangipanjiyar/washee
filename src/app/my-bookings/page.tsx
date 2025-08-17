'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { collection, query, where, getDocs, orderBy, type Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

import { db } from '@/lib/firebase';
import type { Booking } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';


const searchSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
});

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
};

export default function MyBookingsPage() {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof searchSchema>> = async (data) => {
    setLoading(true);
    setSearched(true);
    setBookings([]);
    try {
      const q = query(
        collection(db, 'bookings'),
        where('userPhone', '==', data.phone),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const foundBookings = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const bookingDate = (data.date as Timestamp)?.toDate ? (data.date as Timestamp).toDate() : new Date();
        return { 
            id: doc.id,
            ...data,
            date: bookingDate,
        } as Booking
      });
      setBookings(foundBookings);
      if (foundBookings.length === 0) {
        toast({ title: 'No bookings found for this number.' });
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch bookings.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
          <CardDescription>Enter your phone number to find your bookings.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 10-digit number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Find Bookings'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {searched && !loading && (
        <Card className="max-w-3xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Your Booking History</CardTitle>
            </CardHeader>
            <CardContent>
                {bookings.length > 0 ? (
                <Table>
                    <TableHeader>
                    <TableRow>
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
                                {format(booking.date, 'dd MMM yyyy')}
                                <div className="text-sm text-muted-foreground">{booking.timeSlot}</div>
                            </TableCell>
                            <TableCell>{booking.carType} ({booking.planGroup})</TableCell>
                            <TableCell>{booking.price}</TableCell>
                            <TableCell>
                                <Badge className={cn("capitalize", statusColors[booking.status])} variant="outline">
                                    {booking.status}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                ) : (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No bookings found for the entered phone number.</p>
                </div>
                )}
            </CardContent>
        </Card>
      )}
    </div>
  );
}

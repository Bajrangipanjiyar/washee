'use client';

import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { useAuth } from '@/context/auth-context';
import { plansData } from '@/lib/plans';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import type { PlanGroup, CarType, OnetimeVariant } from '@/types';

interface BookingFormProps {
  planGroup: PlanGroup;
  carType: CarType;
  variant?: OnetimeVariant;
}

const bookingSchema = z.object({
  address: z.string().min(10, 'Address must be at least 10 characters long.'),
  date: z.date({ required_error: 'A date is required.' }),
  timeSlot: z.string({ required_error: 'Please select a time slot.' }),
  notes: z.string().optional(),
});

const timeSlots = [
  "09:00 - 11:00",
  "11:00 - 13:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
];

export function BookingForm({ planGroup, carType, variant }: BookingFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
  });

  const getPlanDetails = () => {
    const carTypeName = carType.charAt(0).toUpperCase() + carType.slice(1).replace(/-/g, ' ');

    let plan, price;
    if (planGroup === 'onetime') {
      const oneTimePlan = plansData.onetime.find(p => p.carType.toLowerCase().replace(/\s+/g, '-') === carType);
      plan = `${carTypeName} - One-Time ${variant} Wash`;
      price = variant === 'basic' ? oneTimePlan?.basic : oneTimePlan?.premium;
    } else {
      const monthlyPlan = plansData[planGroup].find(p => p.carType.toLowerCase().replace(/\s+/g, '-') === carType);
      plan = `${carTypeName} - ${planGroup === 'monthly' ? 'Monthly (6)' : 'Monthly (4)'} Plan`;
      price = monthlyPlan?.price;
    }
    return { plan, price };
  };

  const { plan, price } = getPlanDetails();

  const onSubmit: SubmitHandler<z.infer<typeof bookingSchema>> = async (data) => {
    if (!user || !price) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to book.' });
      return;
    }
    setLoading(true);

    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        userName: user.name || user.email,
        userPhone: user.phone || 'N/A',
        planGroup,
        carType,
        variant: variant || (planGroup === 'monthly' || planGroup === 'monthly4' ? 'full' : undefined),
        price,
        address: data.address,
        date: format(data.date, 'yyyy-MM-dd'),
        timeSlot: data.timeSlot,
        notes: data.notes || '',
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      toast({ title: 'Booking Successful!', description: "We'll confirm your slot soon." });
      router.push('/booking-success');
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({ variant: 'destructive', title: 'Booking Failed', description: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Book Your Wash</CardTitle>
        <CardDescription>You're booking: <span className="font-semibold text-primary">{plan}</span></CardDescription>
        <p className="text-2xl font-bold">Total: ₹{price}</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your full address for the service" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Preferred Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Time Slot</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Any special instructions?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Booking...' : 'Confirm Booking'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

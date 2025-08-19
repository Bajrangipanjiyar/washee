'use client';

import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState, useEffect } from 'react';

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
import { useCustomerAuth } from '@/context/customer-auth-context';

interface BookingFormProps {
  planGroup: PlanGroup;
  carType: CarType;
  variant?: OnetimeVariant;
}

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number with country code.'),
  address: z.string().min(10, 'Address must be at least 10 characters long.'),
  date: z.date({ required_error: 'A date is required.' }),
  timeSlot: z.string({ required_error: 'Please select a time slot.' }),
  notes: z.string().optional(),
});

const timeSlots = [
    "06:00 AM - 07:00 AM",
    "07:00 AM - 08:00 AM",
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
];

export function BookingForm({ planGroup, carType, variant }: BookingFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useCustomerAuth();
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.displayName || '',
      phone: user?.phoneNumber || '',
    },
  });

  useEffect(() => {
    if (user) {
        form.setValue('name', user.displayName || '');
        form.setValue('phone', user.phoneNumber || '');
    }
  }, [user, form]);


  const getPlanDetails = () => {
    const carTypeName = carType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const planGroupMap = {
      'monthly': `Monthly (6 Services)`,
      'monthly4': `Monthly 4-Time Service`,
      'onetime': `One-Time Wash`
    }
    const planDescription = planGroupMap[planGroup]

    let planName: string, price: string | undefined;

    if (planGroup === 'onetime') {
      const oneTimePlan = plansData.onetime.find(p => p.carType.toLowerCase().replace(/\s+/g, '-') === carType);
      const variantName = variant?.charAt(0).toUpperCase() + variant!.slice(1);
      planName = `${carTypeName} - ${variantName} Wash`;
      price = variant === 'basic' ? oneTimePlan?.basic : oneTimePlan?.premium;
    } else {
      const monthlyPlan = plansData[planGroup].find(p => p.carType.toLowerCase().replace(/\s+/g, '-') === carType);
      planName = `${carTypeName} - ${planDescription}`;
      price = monthlyPlan?.price;
    }

    return { planName, price };
  };

  const { planName, price } = getPlanDetails();

  const handleGetCurrentLocation = () => {
    setLocationLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Geocoding would require Google Maps API, which is removed.
          // For now, we can inform the user to enter manually.
           toast({ title: 'Location Found!', description: 'Please enter your address manually for now.' });
           setLocationLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast({ variant: 'destructive', title: 'Location Error', description: 'Could not get your location. Please check your browser settings.' });
          setLocationLoading(false);
        }
      );
    } else {
      toast({ variant: 'destructive', title: 'Unsupported', description: 'Geolocation is not supported by your browser.' });
      setLocationLoading(false);
    }
  };


  const onSubmit: SubmitHandler<z.infer<typeof bookingSchema>> = async (data) => {
    if (!price) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not determine price. Please select a plan again.' });
      return;
    }
    setLoading(true);

    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user?.uid || null, // Temporarily allow null userId
        userName: data.name,
        userPhone: data.phone,
        planGroup,
        carType,
        variant: variant || null,
        price,
        address: data.address,
        date: Timestamp.fromDate(data.date),
        timeSlot: data.timeSlot,
        notes: data.notes || '',
        status: 'confirmed',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      router.push('/booking-success');
    } catch (error) {
      console.error("Error creating booking:", error);
      toast({ variant: 'destructive', title: 'Booking Failed', description: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <CardHeader>
        <CardTitle>Book Your Wash</CardTitle>
        <CardDescription>You're booking: <span className="font-semibold text-primary">{planName}</span></CardDescription>
        <p className="text-2xl font-bold">Total: {price}</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                       <Input placeholder="e.g. +919876543210" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                    <div className="flex justify-between items-center mb-2">
                        <FormLabel>Full Address</FormLabel>
                        <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto"
                            onClick={handleGetCurrentLocation}
                            disabled={locationLoading}
                        >
                            <MapPin className="mr-2 h-4 w-4" />
                            {locationLoading ? 'Fetching...' : 'Get Current Location'}
                        </Button>
                    </div>
                  <FormControl>
                    <Textarea placeholder="Enter your full address for the service." {...field} />
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
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
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

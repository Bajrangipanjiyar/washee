
'use client';

import { useRouter } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState, useEffect, useMemo } from 'react';

import { plansData } from '@/lib/plans';
import { cn } from '@/lib/utils';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import type { PlanGroup, CarType, OnetimeVariant, PaymentMethod } from '@/types';
import { useCustomerAuth } from '@/context/customer-auth-context';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface BookingFormProps {
  planGroup: PlanGroup;
  carType: CarType;
  variant?: OnetimeVariant;
}

const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required.'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number with country code.'),
  house: z.string().min(3, 'House No / Street is required.'),
  city: z.string().min(3, 'City is required.'),
  pincode: z.string().length(6, 'A valid 6-digit pincode is required.'),
  date: z.date({ required_error: 'A date is required.' }),
  timeSlot: z.string({ required_error: 'Please select a time slot.' }),
  notes: z.string().optional(),
  paymentMethod: z.enum(['online', 'cash'], { required_error: 'Please select a payment method.' }),
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

const CONVENIENCE_FEE_PERCENTAGE = 0.02;

export function BookingForm({ planGroup, carType, variant }: BookingFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading: userLoading } = useCustomerAuth();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.displayName || '',
      phone: user?.phoneNumber || '',
      house: '',
      city: '',
      pincode: '',
      notes: '',
      paymentMethod: 'online',
    },
  });
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (user) {
        form.setValue('name', user.displayName || '');
        form.setValue('phone', user.phoneNumber || '');
    }
  }, [user, form]);


  const { planName, price: planPrice } = useMemo(() => {
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
  }, [planGroup, carType, variant]);

  const { convenienceFee, totalPrice } = useMemo(() => {
    const numericPrice = planPrice ? parseFloat(planPrice.replace(/[^0-9.]/g, '')) : 0;
    if (numericPrice === 0) {
        return { convenienceFee: 0, totalPrice: 0 };
    }
    const fee = numericPrice * CONVENIENCE_FEE_PERCENTAGE;
    const total = numericPrice + fee;
    return {
        convenienceFee: Math.ceil(fee), // rounding up to nearest rupee
        totalPrice: Math.ceil(total)
    };
  }, [planPrice]);

  const saveBookingToFirestore = async (formData: z.infer<typeof bookingSchema>, paymentMethod: PaymentMethod, paymentId?: string) => {
    if (!user) throw new Error("User not authenticated.");
    if (!totalPrice) throw new Error("Could not determine price.");

    const fullAddress = `${formData.house}, ${formData.city}, ${formData.pincode}`;
    await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        userName: formData.name,
        userPhone: formData.phone,
        planGroup,
        carType,
        variant: variant || null,
        price: totalPrice.toString(),
        address: fullAddress,
        date: Timestamp.fromDate(formData.date),
        timeSlot: formData.timeSlot,
        notes: formData.notes || '',
        status: paymentMethod === 'online' ? 'confirmed' : 'pending',
        paymentMethod,
        paymentId: paymentId || null,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
    router.push('/booking-success');
  }

  const handlePayment = async (formData: z.infer<typeof bookingSchema>) => {
    if (!totalPrice || !planPrice) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not determine price.' });
        return;
    }
    if (!user) {
        toast({ variant: 'destructive', title: 'Login Required', description: 'You must be logged in to make a booking.' });
        router.push('/login?redirect=' + window.location.pathname + window.location.search);
        return;
    }

    setLoading(true);

    const options = {
        key: 'rzp_test_R7d4vkja9D7Suq',
        amount: totalPrice * 100, // Amount in paise
        currency: 'INR',
        name: 'Washee',
        description: `Payment for ${planName}`,
        handler: async (response: any) => {
            try {
                await saveBookingToFirestore(formData, 'online', response.razorpay_payment_id);
            } catch (error) {
                console.error("Error creating booking after payment:", error);
                toast({ variant: 'destructive', title: 'Booking Failed', description: 'Payment was successful, but booking failed. Please contact support.' });
            } finally {
                setLoading(false);
            }
        },
        prefill: {
            name: formData.name,
            contact: formData.phone,
            email: user?.email || '',
        },
        theme: {
            color: '#2563EB'
        },
        modal: {
            ondismiss: () => {
                setLoading(false);
                toast({ variant: 'destructive', title: 'Payment Cancelled', description: 'You cancelled the payment.' });
            }
        }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onSubmit: SubmitHandler<z.infer<typeof bookingSchema>> = async (data) => {
    if (data.paymentMethod === 'online') {
        handlePayment(data);
    } else {
        setLoading(true);
        try {
            await saveBookingToFirestore(data, 'cash');
        } catch (error) {
             console.error("Error creating cash booking:", error);
             toast({ variant: 'destructive', title: 'Booking Failed', description: 'Could not create your booking. Please try again.' });
        } finally {
            setLoading(false);
        }
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <CardHeader>
        <CardTitle>Book Your Wash</CardTitle>
        <CardDescription>You're booking: <span className="font-semibold text-primary">{planName}</span></CardDescription>
        <div className="space-y-2 pt-4">
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Plan Price:</span>
                <span className="font-semibold">{planPrice}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Convenience Fee (2%):</span>
                <span className="font-semibold">₹{convenienceFee}</span>
            </div>
             <div className="flex justify-between items-center text-xl font-bold border-t pt-2 mt-2">
                <span>Total Payable:</span>
                <span>₹{totalPrice}</span>
            </div>
        </div>
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
                name="house"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>House No / Street</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your house number and street" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                        <Input placeholder="Enter your 6-digit pincode" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </div>


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

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="online" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Pay Online
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">
                         Cash on Service
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-xs text-muted-foreground p-3 bg-accent/50 rounded-md">
                A minimal 2% convenience fee is applied to every order to cover secure payment processing and platform maintenance. This small contribution helps us provide you with a smoother, faster, and more reliable car wash booking experience
            </div>
            
            <Button type="submit" disabled={loading || userLoading} className="w-full">
              {loading ? 'Processing...' : (form.getValues('paymentMethod') === 'online' ? 'Pay & Confirm Booking' : 'Confirm Booking')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

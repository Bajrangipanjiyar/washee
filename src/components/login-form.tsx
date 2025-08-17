'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult
} from 'firebase/auth';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.218,44,30.668,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


const phoneSchema = z.object({
  phone: z.string().regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number.'),
});

const otpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits.').max(6, 'OTP must be 6 digits.'),
});


export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  
  useEffect(() => {
    if (!authLoading && user) {
      const redirectUrl = searchParams.get('redirect') || '/my-bookings';
      router.push(redirectUrl);
    }
  }, [user, authLoading, router, searchParams]);


  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '' },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });


  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
    });
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({ title: 'Successfully signed in with Google.' });
      const redirectUrl = searchParams.get('redirect') || '/my-bookings';
      router.push(redirectUrl);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: error.message,
      });
    }
  };

  const onSendOtp: SubmitHandler<z.infer<typeof phoneSchema>> = async (data) => {
    setLoading(true);
    try {
      const phoneNumber = `+91${data.phone}`;
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      toast({ title: 'OTP sent successfully!' });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to send OTP',
        description: 'Please check the phone number or try again.',
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  const onVerifyOtp: SubmitHandler<z.infer<typeof otpSchema>> = async (data) => {
    if (!confirmationResult) return;
    setLoading(true);
    try {
      await confirmationResult.confirm(data.otp);
      toast({ title: 'Phone number verified successfully!' });
      const redirectUrl = searchParams.get('redirect') || '/my-bookings';
      router.push(redirectUrl);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'OTP Verification Failed',
        description: 'The OTP you entered is incorrect.',
      });
    } finally {
      setLoading(false);
    }
  };


  if (authLoading) {
     return <div className="flex justify-center items-center h-64"><p>Loading...</p></div>;
  }
  
  if (user) {
    return null; // Redirect is handled by useEffect
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login or Sign Up</CardTitle>
        <CardDescription>to book your car wash</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="phone">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="google">Google</TabsTrigger>
          </TabsList>
          <TabsContent value="phone">
            {!confirmationResult ? (
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onSendOtp)} className="space-y-4">
                  <FormField
                    control={phoneForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md h-10">
                              +91
                            </span>
                            <Input placeholder="10-digit number" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Sending...' : 'Send OTP'}
                  </Button>
                </form>
              </Form>
            ) : (
               <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onVerifyOtp)} className="space-y-4">
                   <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter OTP</FormLabel>
                        <FormControl>
                          <Input placeholder="6-digit OTP" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </Button>
                   <Button variant="link" size="sm" onClick={() => setConfirmationResult(null)} className="w-full">
                     Change phone number
                   </Button>
                </form>
              </Form>
            )}
          </TabsContent>
          <TabsContent value="google">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <GoogleIcon />
              Sign in with Google
            </Button>
          </TabsContent>
        </Tabs>
        <div id="recaptcha-container"></div>
      </CardContent>
    </Card>
  );
}

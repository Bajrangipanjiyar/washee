'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { useCustomerAuth } from '@/context/customer-auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

const phoneSchema = z.object({
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number including country code (e.g., +91).'),
});

const otpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits.'),
});

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="mr-2"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.574l6.19 5.238C42.032 36.371 44 30.655 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
);


export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, signInWithGoogle, signInWithPhone, confirmOtp } = useCustomerAuth();
  const { toast } = useToast();

  const [authLoading, setAuthLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const redirectUrl = searchParams.get('redirect') || '/';

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: '+91' },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: '' },
  });

  useEffect(() => {
    if (!loading && user) {
        router.replace(redirectUrl);
    }
  }, [user, loading, router, redirectUrl]);

  const handlePhoneSignIn: SubmitHandler<z.infer<typeof phoneSchema>> = async (data) => {
    setAuthLoading(true);
    try {
      const result = await signInWithPhone(data.phone);
      setConfirmationResult(result);
      toast({ title: 'OTP Sent!', description: 'Please check your phone for the verification code.' });
    } catch (e) {
      // Error is already handled in the auth context
    } finally {
      setAuthLoading(false);
    }
  };

  const handleOtpSubmit: SubmitHandler<z.infer<typeof otpSchema>> = async (data) => {
    setAuthLoading(true);
    try {
      await confirmOtp(confirmationResult, data.otp);
      toast({ title: 'Login Successful!' });
      // Redirect is handled by the useEffect hook
    } catch (e) {
      // Error is already handled in the auth context
    } finally {
      setAuthLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    try {
        await signInWithGoogle();
        toast({ title: 'Login Successful!' });
    } catch(e) {
        // Error is already handled in the auth context
    } finally {
        setAuthLoading(false);
    }
  }

  if (loading || user) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="mt-4">Login or Sign Up</CardTitle>
        <CardDescription>to book your car wash</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!confirmationResult ? (
          <Form {...phoneForm}>
            <form onSubmit={phoneForm.handleSubmit(handlePhoneSignIn)} className="space-y-4">
              <FormField
                control={phoneForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone with country code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={authLoading} className="w-full">
                {authLoading ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...otpForm}>
            <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4">
              <FormField
                control={otpForm.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter OTP</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter 6-digit OTP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={authLoading} className="w-full">
                {authLoading ? 'Verifying...' : 'Verify OTP'}
              </Button>
               <Button variant="link" size="sm" onClick={() => setConfirmationResult(null)}>
                 Back to phone number entry
               </Button>
            </form>
          </Form>
        )}
        
        <div className="relative">
          <Separator />
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          disabled={authLoading}
          className="w-full"
          variant="outline"
        >
          <GoogleIcon />
          Continue with Google
        </Button>
        <div id="recaptcha-container"></div>
      </CardContent>
    </Card>
  );
}

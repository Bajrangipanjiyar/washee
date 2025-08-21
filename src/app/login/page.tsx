'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useCustomerAuth } from '@/context/customer-auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="mr-2"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.574l6.19 5.238C42.032 36.371 44 30.655 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
);

function LoginPageContent() {
  const router = useRouter();
  const { user, loading, signInWithGoogle } = useCustomerAuth();
  const [authLoading, setAuthLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user) {
        router.replace('/');
    }
  }, [user, loading, router]);

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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container flex items-center justify-center py-20 animate-fade-in-up">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="mt-4">Login or Sign Up</CardTitle>
          <CardDescription>to book your car wash</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={authLoading}
            className="w-full"
            variant="outline"
          >
            <GoogleIcon />
            {authLoading ? 'Signing in...' : 'Continue with Google'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginPageContent />
        </Suspense>
    )
}

'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BookingForm } from '@/components/booking-form';
import type { PlanGroup, CarType, OnetimeVariant } from '@/types';
import { useCustomerAuth } from '@/context/customer-auth-context';
import { Skeleton } from '@/components/ui/skeleton';

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useCustomerAuth();

  const planGroup = searchParams.get('planGroup') as PlanGroup;
  const carType = searchParams.get('carType') as CarType;
  const variant = searchParams.get('variant') as OnetimeVariant | undefined;

  useEffect(() => {
    if (!loading && !user) {
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, loading, router]);
  
  if (loading || !user) {
    return (
        <div className="container py-12">
            <div className="max-w-2xl mx-auto space-y-6">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-8 w-1/3" />
                <div className="space-y-8 pt-6">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
            </div>
        </div>
    )
  }

  if (!planGroup || !carType) {
    return <div className="container py-12 text-center"><p>Invalid plan selection. Please <a href="/plans" className="underline text-primary">go back to plans</a> and choose one.</p></div>;
  }
  
  if (planGroup === 'onetime' && !variant) {
    return <div className="container py-12 text-center"><p>Invalid plan variant. Please <a href="/plans" className="underline text-primary">go back to plans</a> and choose one.</p></div>;
  }

  return (
    <div className="container py-12">
      <BookingForm planGroup={planGroup} carType={carType} variant={variant} />
    </div>
  );
}

export default function BookPage() {
    return (
        <Suspense fallback={<div className="container py-12"><p>Loading...</p></div>}>
            <BookingPageContent />
        </Suspense>
    )
}

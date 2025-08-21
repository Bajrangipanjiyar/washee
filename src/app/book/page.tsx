
'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookingForm } from '@/components/booking-form';
import type { PlanGroup, CarType, OnetimeVariant } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useCustomerAuth } from '@/context/customer-auth-context';

function BookingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading } = useCustomerAuth();

  const planGroup = searchParams.get('planGroup') as PlanGroup;
  const carType = searchParams.get('carType') as CarType;
  const variant = searchParams.get('variant') as OnetimeVariant | undefined;
  
  useEffect(() => {
    if (!loading && !user) {
        const queryString = `?planGroup=${planGroup}&carType=${carType}${variant ? `&variant=${variant}` : ''}`;
        router.push(`/login?redirect=/book${encodeURIComponent(queryString)}`);
    }
  }, [user, loading, router, planGroup, carType, variant]);

  if (loading || !user) {
    return (
        <div className="container py-12">
            <div className="max-w-2xl mx-auto">
                <Skeleton className="h-12 w-1/2 mb-4" />
                <Skeleton className="h-96 w-full" />
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

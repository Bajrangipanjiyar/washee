'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookingForm } from '@/components/booking-form';
import type { PlanGroup, CarType, OnetimeVariant } from '@/types';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useUser();

  const planGroup = searchParams.get('planGroup') as PlanGroup;
  const carType = searchParams.get('carType') as CarType;
  const variant = searchParams.get('variant') as OnetimeVariant | undefined;
  
  useEffect(() => {
    if (!loading && !user) {
      const currentPath = window.location.pathname + window.location.search;
      router.push(`/profile?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return <div className="container py-12 text-center"><p>Loading & verifying user...</p></div>;
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

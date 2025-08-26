
import { plansData } from '@/lib/plans';
import { PlanCard } from '@/components/plan-card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing Plans',
    description: 'Explore our affordable and flexible car wash plans. Choose from monthly subscriptions or one-time washes for your hatchback, SUV, or luxury car.',
    keywords: ['car wash plans', 'car wash price', 'subscription car wash', 'monthly car wash', 'one-time car wash'],
};


export default function PlansPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Our Plans</h1>
        <p className="mt-2 text-lg text-muted-foreground">Choose the perfect wash for your car.</p>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold font-headline mb-6 text-center">One-Time Wash</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plansData.onetime.map((plan, index) => (
            <PlanCard key={index} plan={plan} planGroup="onetime" />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold font-headline mb-6 text-center">Subscription Plans (Monthly - 6 Services)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plansData.monthly.map((plan, index) => (
            <PlanCard key={index} plan={plan} planGroup="monthly" isFeatured={plan.carType === 'Luxury Cars'} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold font-headline mb-6 text-center">Subscription Plans (Monthly - 4 Services)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plansData.monthly4.map((plan, index) => (
            <PlanCard key={index} plan={plan} planGroup="monthly4" />
          ))}
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Plan, PlanGroup } from '@/types';
import { cn } from '@/lib/utils';

interface PlanCardProps {
  plan: Plan;
  planGroup: PlanGroup;
  isFeatured?: boolean;
}

export function PlanCard({ plan, planGroup, isFeatured = false }: PlanCardProps) {
  const { carType, price, originalPrice, split, basic, premium, originalBasic, originalPremium } = plan;

  const getBookingLink = (variant?: 'basic' | 'premium') => {
    const carTypeSlug = carType.toLowerCase().replace(/\s+/g, '-');
    let link = `/book?planGroup=${planGroup}&carType=${carTypeSlug}`;
    if (variant) {
      link += `&variant=${variant}`;
    }
    return link;
  };

  const renderContent = () => {
    if (planGroup === 'onetime') {
      return (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-accent/50">
            <h4 className="font-semibold">Basic Wash</h4>
            <p className="text-2xl font-bold flex items-baseline gap-2">
              <span className="text-base font-normal text-muted-foreground line-through">₹{originalBasic}</span>
              <span>₹{basic}</span>
            </p>
            <Button asChild className="w-full mt-2">
              <Link href={getBookingLink('basic')}>Book Basic</Link>
            </Button>
          </div>
          <div className="p-4 border rounded-lg bg-accent/50">
            <h4 className="font-semibold">Premium Wash</h4>
            <p className="text-2xl font-bold flex items-baseline gap-2">
              <span className="text-base font-normal text-muted-foreground line-through">₹{originalPremium}</span>
              <span>₹{premium}</span>
            </p>
            <Button asChild className="w-full mt-2">
              <Link href={getBookingLink('premium')}>Book Premium</Link>
            </Button>
          </div>
        </div>
      );
    }

    return (
      <ul className="space-y-2 text-sm text-muted-foreground">
        {split && (
          <>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>{split.exterior}x exterior wash</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span>
                {split.full}x interior+exterior + polish
              </span>
            </li>
          </>
        )}
      </ul>
    );
  };

  return (
    <Card className={cn("flex flex-col", isFeatured && "border-primary shadow-lg")}>
      <CardHeader>
        <CardTitle>{carType}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {price && (
          <div className="mb-4">
            <p className="text-3xl font-bold flex items-baseline gap-2">
                {originalPrice && (
                    <span className="text-xl font-normal text-muted-foreground line-through">
                        ₹{originalPrice}
                    </span>
                )}
                <span>₹{price}</span>
            </p>
            <p className="text-sm font-normal text-muted-foreground">/month</p>
          </div>
        )}
        {renderContent()}
      </CardContent>
      {planGroup !== 'onetime' && (
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={getBookingLink()}>Book Now</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

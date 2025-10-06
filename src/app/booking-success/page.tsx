
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BookingSuccessPage() {
  return (
    <div className="container flex items-center justify-center py-20">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 rounded-full p-4 w-fit">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="mt-4 text-3xl">Booking Successful!</CardTitle>
          <CardDescription className="text-lg">
            We’ve received your request and will confirm your slot soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/my-bookings">View My Bookings</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Car, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl">Washee</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/plans"
            className="transition-colors hover:text-primary"
          >
            Plans
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin">
              <Shield className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

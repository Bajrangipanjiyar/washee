'use client';

import Link from 'next/link';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useUser } from '@/context/user-context';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function WLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 70"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0L20 70L50 20L80 70L100 0H75L50 45L25 0H0Z" />
    </svg>
  );
}


export function Navbar() {
  const { user: adminUser, logout, loading: adminLoading } = useAuth();
  const { user: customerUser, loading: customerLoading } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <WLogo className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl">Washee</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/plans"
            className="transition-colors hover:text-primary"
          >
            Plans
          </Link>
          <Link
            href="/my-bookings"
            className="transition-colors hover:text-primary"
          >
            My Bookings
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {!customerLoading && (
            customerUser ? (
                 <Button asChild variant="ghost" size="sm">
                    <Link href="/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                 </Button>
            ) : (
                <Button asChild variant="ghost" size="sm">
                    <Link href="/profile">
                        <UserIcon className="mr-2 h-4 w-4" />
                        Login
                    </Link>
                </Button>
            )
          )}
          {!adminLoading && (
            adminUser ? (
              <>
                <Avatar className="h-8 w-8">
                    <AvatarImage src={adminUser.photoURL ?? ''} alt={adminUser.displayName ?? 'User'} />
                    <AvatarFallback>{adminUser.displayName?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button onClick={logout} variant="ghost" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/login">
                  <Shield className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
    </header>
  );
}

'use client';

import { Button } from "../ui/button";
import Link from "next/link";
  
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

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <WLogo className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            © {new Date().getFullYear()} Washee. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
             <Link href="tel:+916003151047" className="hover:text-primary">+91 6003151047</Link>
             <Link href="mailto:panjiyarbajrangi@gmail.com" className="hover:text-primary">panjiyarbajrangi@gmail.com</Link>
            
            <Button asChild variant="link" className="text-sm px-1">
              <Link href="/about-us">About Us</Link>
            </Button>
            <Button asChild variant="link" className="text-sm px-1">
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            </Button>
            <Button asChild variant="link" className="text-sm px-1">
              <Link href="/privacy-policy">Privacy Policy</Link>
            </Button>
            <Button asChild variant="link" className="text-sm px-1">
              <Link href="/refund-and-cancellation">Refund &amp; Cancellation</Link>
            </Button>
        </div>
      </div>
    </footer>
  );
}

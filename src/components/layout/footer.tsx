
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
  
const socialLinks = [
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/profile.php?id=61579018749962',
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
            </svg>
        )
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/washee.in?igsh=MWkwZmpldHhlM2wwNw==',
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0 3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
            </svg>
        )
    },
    {
        name: 'YouTube',
        url: 'https://youtube.com/@washee_in?si=8LCEl1wUZPojhDTV',
        icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
        )
    }
];

export function Footer() {
  return (
    <footer className="border-t bg-blue-50">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:py-8">
        <div className="flex flex-col items-center gap-4 px-8 md:px-0">
          <WLogo className="h-8 w-8 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            © {new Date().getFullYear()} Washee. All rights reserved.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
             <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                 <Link href="tel:+916003151047" className="hover:text-primary transition-colors">+91 6003151047</Link>
                 <Link href="mailto:panjiyarbajrangi@gmail.com" className="hover:text-primary transition-colors">panjiyarbajrangi@gmail.com</Link>
                
                <Button asChild variant="link" className="text-sm px-1 text-muted-foreground">
                  <Link href="/about-us">About Us</Link>
                </Button>
                <Button asChild variant="link" className="text-sm px-1 text-muted-foreground">
                  <Link href="/news">News</Link>
                </Button>
                <Button asChild variant="link" className="text-sm px-1 text-muted-foreground">
                  <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
                </Button>
                <Button asChild variant="link" className="text-sm px-1 text-muted-foreground">
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </Button>
                <Button asChild variant="link" className="text-sm px-1 text-muted-foreground">
                  <Link href="/refund-and-cancellation">Refund &amp; Cancellation</Link>
                </Button>
                 <Button asChild variant="link" className="text-sm px-1 text-muted-foreground">
                  <Link href="/service-delivery-policy">Service Delivery Policy</Link>
                </Button>
                 <Button asChild variant="link" className="text-sm px-1 text-muted-foreground">
                  <Link href="/disclaimer">Disclaimer</Link>
                </Button>
            </div>
            <div className="flex justify-center items-center gap-4 mt-2">
              {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {social.icon}
                    <span className="sr-only">{social.name}</span>
                  </a>
              ))}
            </div>
        </div>
      </div>
    </footer>
  );
}

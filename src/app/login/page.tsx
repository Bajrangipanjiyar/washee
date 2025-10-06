
'use client';

import { Suspense } from 'react';
import { LoginForm } from '@/components/login-form';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

function LoginPageContent() {
  return (
    <div className="container flex items-center justify-center py-20 animate-fade-in-up">
      <LoginForm />
    </div>
  );
}


export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <>
                <Navbar />
                <main className="flex-grow">
                    <LoginPageContent />
                </main>
                <Footer />
            </>
        </Suspense>
    )
}

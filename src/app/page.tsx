import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold font-headline">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-primary via-blue-500 to-indigo-600 text-transparent bg-clip-text">
              Washee
            </span>{' '}
          </h1>
          <h2>Doorstep Car Wash, Fair Prices.</h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Premium car wash at your door. Hassle-free booking and professional service.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3" asChild>
            <Link href="/plans">View Plans</Link>
          </Button>
          <Button variant="outline" className="w-full md:w-1/3" asChild>
            <Link href="/login">Login to Book</Link>
          </Button>
        </div>
      </div>

      <div className="relative group">
         <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <Image
          src="https://placehold.co/700x500.png"
          alt="Shiny clean car"
          data-ai-hint="shiny car"
          width={700}
          height={500}
          className="rounded-lg shadow-2xl relative"
        />
      </div>
    </section>
  );
}

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 relative overflow-hidden">
        {/* Glowing effect for the catchy dark background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl space-y-6 relative z-10">
          <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Hire smarter with <span className="text-primary">AI</span>.
          </h1>
          <p className="text-xl text-muted-foreground">
            The AI-powered recruitment platform that helps you find, analyze, and match the best candidates faster than ever before.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90">Start Hiring</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="h-12 px-8 text-lg border-border hover:bg-accent hover:text-accent-foreground">Apply for Jobs</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

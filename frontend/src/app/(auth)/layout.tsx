import { Navbar } from '@/components/layout/Navbar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        {children}
      </main>
    </div>
  );
}

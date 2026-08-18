import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { AuthGuard } from '@/components/auth/AuthGuard';

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['CANDIDATE']}>
      <div className="flex h-screen overflow-hidden bg-background">
        <DashboardSidebar role="candidate" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6 relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}

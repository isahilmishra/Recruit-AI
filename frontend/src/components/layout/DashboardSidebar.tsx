"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Briefcase, Settings, FileText, Send } from 'lucide-react';

interface SidebarProps {
  role: 'recruiter' | 'candidate';
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const recruiterLinks = [
    { name: 'Overview', href: '/recruiter', icon: LayoutDashboard },
    { name: 'Jobs', href: '/recruiter/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/recruiter/candidates', icon: Users },
    { name: 'Interviews', href: '/recruiter/interviews', icon: FileText },
    { name: 'Emails', href: '/recruiter/emails', icon: Send },
    { name: 'Settings', href: '/recruiter/settings', icon: Settings },
  ];

  const candidateLinks = [
    { name: 'Dashboard', href: '/candidate', icon: LayoutDashboard },
    { name: 'My Applications', href: '/candidate/applications', icon: Briefcase },
    { name: 'Resume', href: '/candidate/resume', icon: FileText },
    { name: 'Settings', href: '/candidate/settings', icon: Settings },
  ];

  const links = role === 'recruiter' ? recruiterLinks : candidateLinks;

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="font-bold text-xl tracking-tight text-foreground">
          Recruit<span className="text-primary">AI</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (pathname.startsWith(`${link.href}/`) && link.href !== '/recruiter' && link.href !== '/candidate');
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

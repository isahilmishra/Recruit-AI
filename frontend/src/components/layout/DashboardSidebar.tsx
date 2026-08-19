"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Briefcase, Settings, FileText, Send, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  role: 'recruiter' | 'candidate';
}

export function DashboardSidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const recruiterLinks = [
    { name: 'Overview', href: '/recruiter', icon: LayoutDashboard },
    { name: 'Jobs', href: '/recruiter/jobs', icon: Briefcase },
    { name: 'Candidates', href: '/recruiter/candidates', icon: Users },
    { name: 'AI Search', href: '/recruiter/search', icon: Search },
    { name: 'Interviews', href: '/recruiter/interviews', icon: FileText },
    { name: 'Emails', href: '/recruiter/emails', icon: Send },
    { name: 'Settings', href: '/recruiter/settings', icon: Settings },
  ];

  const candidateLinks = [
    { name: 'Dashboard', href: '/candidate', icon: LayoutDashboard },
    { name: 'My Applications', href: '/candidate/applications', icon: Briefcase },
    { name: 'Interviews', href: '/candidate/interviews', icon: FileText },
    { name: 'Resume', href: '/candidate/resume', icon: FileText },
    { name: 'Settings', href: '/candidate/settings', icon: Settings },
  ];

  const links = role === 'recruiter' ? recruiterLinks : candidateLinks;

  return (
    <div className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/" className="font-bold text-xl tracking-tight text-foreground flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-black">R</span>
          </div>
          <span>Recruit<span className="text-primary">AI</span></span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 px-4 py-6 relative">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (pathname.startsWith(`${link.href}/`) && link.href !== '/recruiter' && link.href !== '/candidate');
          
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors z-10",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl -z-10 border border-primary/20"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {!isActive && (
                <div className="absolute inset-0 bg-accent/50 opacity-0 group-hover:opacity-100 rounded-xl -z-10 transition-opacity" />
              )}
              <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              {link.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

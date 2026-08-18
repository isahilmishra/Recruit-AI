"use client";

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: ('CANDIDATE' | 'RECRUITER' | 'ADMIN')[];
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Not logged in
        router.replace('/auth/login');
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Logged in but wrong role
        if (user.role === 'RECRUITER') {
          router.replace('/recruiter');
        } else {
          router.replace('/candidate');
        }
      }
    }
  }, [user, isLoading, router, allowedRoles, pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}

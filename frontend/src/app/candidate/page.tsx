"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CandidateDashboardPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/candidates/applications", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok && result.data) {
          setApplications(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (token) fetchApplications();
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome, Applicant</h1>
        <p className="text-muted-foreground">Track your applications and resume status.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter(a => a.status === 'AI_REVIEW').length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Matches</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {applications.filter(a => (a.evaluation?.overallScore || 0) >= 80).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {applications.length === 0 ? (
              <div className="text-sm text-muted-foreground">Your recent job applications will appear here.</div>
            ) : (
              <div className="space-y-4">
                {applications.slice(0, 3).map(app => (
                  <div key={app.id} className="flex justify-between items-center pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{app.job?.title}</div>
                      <div className="text-xs text-muted-foreground">{app.job?.company || 'Company'}</div>
                    </div>
                    <div className="text-sm font-bold text-primary">{Math.round(app.evaluation?.overallScore || 0)}%</div>
                  </div>
                ))}
                {applications.length > 3 && (
                  <Link href="/candidate/applications" className={buttonVariants({ variant: "link", className: "w-full text-muted-foreground" })}>
                    View all <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>My Resume</CardTitle>
              <CardDescription>Manage your parsed profile</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              To apply for new jobs, you first need to parse your resume and build your profile using our AI engine.
            </p>
            <Link href="/candidate/resume" className={buttonVariants({ className: "w-full" })}>
              Manage Resume Profile <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

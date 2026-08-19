"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function CandidateDashboardPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/applications`, {
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
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Welcome, Applicant</h1>
        <p className="text-muted-foreground mt-1">Track your applications and resume status.</p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-3"
      >
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">{applications.length}</div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Review</CardTitle>
              <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">
                {applications.filter(a => a.status === 'AI_REVIEW').length}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Top Matches</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black">
                {applications.filter(a => (a.evaluation?.overallScore || 0) >= 80).length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="h-full bg-card/50 backdrop-blur-md border-border/50 shadow-sm">
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
                      <div className="flex items-center gap-2">
                        {/* Fake Progress Ring using conic-gradient */}
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-primary relative"
                          style={{
                            background: `conic-gradient(var(--primary) ${Math.round(app.evaluation?.overallScore || 0)}%, transparent 0)`,
                          }}
                        >
                          <div className="absolute inset-1 bg-card rounded-full flex items-center justify-center">
                            {Math.round(app.evaluation?.overallScore || 0)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {applications.length > 3 && (
                    <Link href="/candidate/applications" className={buttonVariants({ variant: "link", className: "w-full text-muted-foreground hover:text-primary" })}>
                      View all <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="h-full bg-card/50 backdrop-blur-md border-border/50 shadow-sm">
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
              <Link href="/candidate/resume" className={buttonVariants({ className: "w-full shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all" })}>
                Manage Resume Profile <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Briefcase, Users, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function RecruiterJobsPage() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruiters/jobs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await res.json();
        if (res.ok && result.data) {
          setJobs(result.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchJobs();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Jobs</h1>
          <p className="text-muted-foreground">Manage your posted jobs and view applicants.</p>
        </div>
        <Link href="/recruiter" className={buttonVariants()}>
          <PlusCircle className="h-4 w-4 mr-2" /> Post New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <Card className="bg-card/50 backdrop-blur-sm border-border flex flex-col items-center justify-center h-[300px] text-center">
          <Briefcase className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
          <h3 className="font-semibold text-lg">No Jobs Posted</h3>
          <p className="text-muted-foreground text-sm mt-1 mb-4">You haven't posted any jobs yet.</p>
          <Link href="/recruiter" className={buttonVariants({ variant: "outline" })}>
             Post a Job
          </Link>
        </Card>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={job.id}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card transition-colors">
                <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">{job.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <span>{job.company || 'Company'}</span>
                      {job.location && (
                        <>
                          <span>•</span>
                          <span>{job.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0 bg-primary/5 p-3 rounded-lg border border-primary/10">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Status</div>
                      <div className="font-semibold text-sm mt-1 text-green-500">
                        {job.status}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-border"></div>
                    <div className="text-center cursor-pointer hover:opacity-80 transition-opacity">
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Applicants</div>
                      <div className="flex items-center justify-center gap-1 font-black text-xl text-primary mt-1">
                        {job._count?.applications || 0}
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Target, Briefcase, Building } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Badge } from "@/components/ui/badge";

interface MatchEvaluatorProps {
  resumeData: any;
  onMatchSuccess: (data: any) => void;
}

export function MatchEvaluator({ resumeData, onMatchSuccess }: MatchEvaluatorProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [evaluatingId, setEvaluatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { token } = useAuth();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/jobs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await response.json();
        if (response.ok && result.data) {
          setJobs(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoadingJobs(false);
      }
    };
    if (token) fetchJobs();
  }, [token]);

  const handleApply = async (jobId: string) => {
    setEvaluatingId(jobId);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/evaluate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ jobId }),
      });

      const result = await response.json();

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || "Failed to evaluate match and apply.");
      }

      onMatchSuccess(result.data.evaluation);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setEvaluatingId(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4 mt-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Available Jobs</h3>
      </div>
      
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive font-medium p-3 rounded-md bg-destructive/10 border border-destructive/20"
        >
          {error}
        </motion.div>
      )}

      {loadingJobs ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-card/30 text-muted-foreground">
          <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No open jobs available right now.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-lg text-foreground">{job.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Building className="h-4 w-4" />
                    <span>{job.company}</span>
                    {job.location && (
                      <>
                        <span>•</span>
                        <span>{job.location}</span>
                      </>
                    )}
                  </div>
                  {job.requirements && job.requirements.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.requirements.slice(0, 3).map((req: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="text-xs font-normal">
                          {req}
                        </Badge>
                      ))}
                      {job.requirements.length > 3 && (
                        <Badge variant="outline" className="text-xs font-normal">
                          +{job.requirements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={() => handleApply(job.id)} 
                  disabled={evaluatingId !== null} 
                  className="shrink-0"
                >
                  {evaluatingId === job.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Evaluating...
                    </>
                  ) : (
                    "Apply & Evaluate"
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

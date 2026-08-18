"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { User, CheckCircle2, Loader2, Frown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

interface TopCandidatesListProps {
  jobId: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
};

export function TopCandidatesList({ jobId }: TopCandidatesListProps) {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchCandidates = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recruiters/jobs/${jobId}/candidates`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const result = await response.json();
        if (response.ok && result.data) {
          setCandidates(result.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token && jobId) {
      fetchCandidates();
      // Poll every 5 seconds since a candidate might apply while the recruiter is watching
      interval = setInterval(fetchCandidates, 5000);
    }

    return () => clearInterval(interval);
  }, [jobId, token]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading candidate matches...</p>
      </div>
    );
  }

  if (candidates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground border border-dashed rounded-lg p-6 text-center">
        <Frown className="h-8 w-8 mb-4 opacity-50" />
        <p>No candidates have applied to this job yet.</p>
        <p className="text-sm mt-2">Waiting for live applications...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Live AI Matches
        </h3>
        <span className="text-xs text-muted-foreground">Auto-updates as candidates apply</span>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {candidates.map((app) => (
          <motion.div 
            key={app.id}
            variants={itemVariants}
            className="p-4 border rounded-lg bg-card/50 hover:bg-card transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <span className="text-lg font-black text-primary">{Math.round(app.evaluation?.overallScore || 0)}%</span>
                {(app.evaluation?.overallScore || 0) >= 80 && (
                  <CheckCircle2 className="absolute -bottom-1 -right-1 h-5 w-5 text-green-500 bg-background rounded-full" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{app.candidate?.user?.name || 'Unknown Candidate'}</h4>
                <p className="text-sm text-muted-foreground">{app.candidate?.user?.email}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {app.evaluation?.matchedSkills?.slice(0, 4).map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-green-500/10 text-green-600">
                      {skill}
                    </Badge>
                  ))}
                  {(app.evaluation?.matchedSkills?.length || 0) > 4 && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
                      +{(app.evaluation?.matchedSkills?.length || 0) - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex sm:flex-col gap-2 shrink-0">
              <Button size="sm" variant="default" className="w-full">Review Profile</Button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

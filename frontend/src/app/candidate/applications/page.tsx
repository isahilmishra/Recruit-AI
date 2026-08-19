"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Briefcase, Building, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CandidateApplicationsPage() {
  const { token } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchApplications();
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Applications</h1>
        <p className="text-muted-foreground">Track the status of your submitted job applications.</p>
      </div>

      {applications.length === 0 ? (
        <Card className="bg-card/50 backdrop-blur-sm border-border flex flex-col items-center justify-center h-[300px] text-center">
          <Briefcase className="h-10 w-10 text-muted-foreground mb-4 opacity-50" />
          <h3 className="font-semibold text-lg">No Applications Yet</h3>
          <p className="text-muted-foreground text-sm mt-1">Upload your resume and apply to jobs from the Dashboard.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={app.id}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border hover:bg-card transition-colors">
                <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{app.job?.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Building className="h-4 w-4" />
                      <span>{app.job?.company || 'Company'}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 shrink-0 bg-primary/5 p-3 rounded-lg border border-primary/10">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">AI Match</div>
                      <div className="flex items-center justify-center gap-1 font-black text-xl text-primary mt-1">
                        {Math.round(app.evaluation?.overallScore || 0)}%
                        {(app.evaluation?.overallScore || 0) >= 80 && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-border"></div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Status</div>
                      <div className="font-semibold text-sm mt-1">
                        {app.status === 'AI_REVIEW' ? 'Under Review' : app.status}
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

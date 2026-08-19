"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Briefcase, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";

interface JobAnalyzerProps {
  onAnalyzeSuccess: (data: any) => void;
}

export function JobAnalyzer({ onAnalyzeSuccess }: JobAnalyzerProps) {
  const [jobText, setJobText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const handleAnalyze = async () => {
    if (!jobText.trim()) {
      setError("Please paste a job description first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruiters/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ text: jobText }),
      });

      const result = await response.json();

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || "Failed to start job analysis.");
      }

      const jobId = result.data.jobId;
      
      // Start polling
      let status = "PENDING";
      let analyzedData = null;
      
      while (status === "PENDING" || status === "PROCESSING") {
        await new Promise(r => setTimeout(r, 2000)); // wait 2 seconds
        
        const statusRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruiters/jobs/status/${jobId}`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
        
        const statusData = await statusRes.json();
        if (!statusRes.ok || statusData.status === 'error') {
          throw new Error(statusData.message || "Failed to check status.");
        }
        
        status = statusData.data.status;
        if (status === "COMPLETED") {
          analyzedData = statusData.data.result.analyzedData;
        } else if (status === "FAILED") {
          throw new Error(statusData.data.error || "AI processing failed.");
        }
      }

      onAnalyzeSuccess(analyzedData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Textarea
          placeholder="Paste the raw job description text here..."
          className="min-h-[200px] resize-y bg-background/50 focus:bg-background transition-colors duration-300"
          value={jobText}
          onChange={(e) => setJobText(e.target.value)}
          disabled={isLoading}
        />
        <AnimatePresence>
          {jobText.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-muted-foreground"
            >
              <Briefcase className="h-10 w-10 mb-2 opacity-50" />
              <span className="text-sm">Copy and paste job description</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-destructive font-medium p-3 rounded-md bg-destructive/10"
        >
          {error}
        </motion.div>
      )}

      <Button 
        onClick={handleAnalyze} 
        disabled={isLoading || !jobText.trim()} 
        className="w-full sm:w-auto flex items-center gap-2 group transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing Job...
          </>
        ) : (
          <>
            <Wand2 className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
            Parse Job Requirements
          </>
        )}
      </Button>
    </div>
  );
}

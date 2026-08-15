"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Target, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MatchEvaluatorProps {
  resumeData: any;
  onMatchSuccess: (data: any) => void;
}

export function MatchEvaluator({ resumeData, onMatchSuccess }: MatchEvaluatorProps) {
  const [jobText, setJobText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = async () => {
    if (!jobText.trim()) {
      setError("Please paste a job description first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/ai/test-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeData, jobText }),
      });

      const result = await response.json();

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || "Failed to evaluate match.");
      }

      onMatchSuccess(result.data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4 mt-6 p-4 border rounded-lg bg-card/30"
    >
      <div className="flex items-center gap-2 mb-2">
        <Target className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Evaluate Match against a Job Description</h3>
      </div>
      
      <div className="relative">
        <Textarea
          placeholder="Paste the job description here..."
          className="min-h-[150px] resize-y bg-background focus:bg-background transition-colors duration-300"
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
              <Briefcase className="h-8 w-8 mb-2 opacity-50" />
              <span className="text-sm">Paste Job Description</span>
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
        onClick={handleMatch} 
        disabled={isLoading || !jobText.trim()} 
        className="w-full flex items-center gap-2"
        variant="default"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing Match...
          </>
        ) : (
          <>
            <Target className="h-4 w-4" />
            Calculate Match Score
          </>
        )}
      </Button>
    </motion.div>
  );
}

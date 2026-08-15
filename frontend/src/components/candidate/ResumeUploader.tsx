"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UploadCloud, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResumeUploaderProps {
  onParseSuccess: (data: any) => void;
}

export function ResumeUploader({ onParseSuccess }: ResumeUploaderProps) {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!text.trim()) {
      setError("Please paste some resume text first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/ai/test-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const result = await response.json();

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || "Failed to parse resume.");
      }

      onParseSuccess(result.data);
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
          placeholder="Paste your resume text here..."
          className="min-h-[200px] resize-y bg-background/50 focus:bg-background transition-colors duration-300"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        <AnimatePresence>
          {text.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-muted-foreground"
            >
              <FileText className="h-10 w-10 mb-2 opacity-50" />
              <span className="text-sm">Copy and paste resume content</span>
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
        onClick={handleUpload} 
        disabled={isLoading || !text.trim()} 
        className="w-full sm:w-auto flex items-center gap-2 group transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Parsing Profile...
          </>
        ) : (
          <>
            <UploadCloud className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
            Analyze Resume
          </>
        )}
      </Button>
    </div>
  );
}

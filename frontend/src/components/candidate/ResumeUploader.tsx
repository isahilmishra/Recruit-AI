"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { useDropzone } from "react-dropzone";

interface ResumeUploaderProps {
  onParseSuccess: (data: any) => void;
}

export function ResumeUploader({ onParseSuccess }: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resumeFile", file);

    try {
      const response = await fetch("http://localhost:5000/api/candidates/resume", {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || "Failed to start resume upload.");
      }

      const jobId = result.data.jobId;
      
      // Start polling
      let status = "PENDING";
      let parsedData = null;
      
      while (status === "PENDING" || status === "PROCESSING") {
        await new Promise(r => setTimeout(r, 2000)); // wait 2 seconds
        
        const statusRes = await fetch(`http://localhost:5000/api/candidates/resume/status/${jobId}`, {
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
          parsedData = statusData.data.result.parsedData;
        } else if (status === "FAILED") {
          throw new Error(statusData.data.error || "AI processing failed.");
        }
      }

      onParseSuccess(parsedData);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div 
        {...getRootProps()} 
        className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer min-h-[200px]
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-border bg-card/50 hover:bg-muted/50 hover:border-primary/50'}
        `}
      >
        <input {...getInputProps()} />
        
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div 
              key="file"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center text-center space-y-3"
            >
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <p className="text-xs text-primary mt-2">Click or drag to replace</p>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center text-center space-y-3 text-muted-foreground"
            >
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-2">
                <UploadCloud className="h-8 w-8 opacity-70" />
              </div>
              <div>
                <p className="font-medium text-foreground">Click to upload or drag and drop</p>
                <p className="text-sm">PDF or TXT files only</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

      <Button 
        onClick={handleUpload} 
        disabled={isLoading || !file} 
        className="w-full sm:w-auto flex items-center gap-2 group transition-all"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Extracting Profile via AI...
          </>
        ) : (
          <>
            <FileText className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
            Analyze Document
          </>
        )}
      </Button>
    </div>
  );
}

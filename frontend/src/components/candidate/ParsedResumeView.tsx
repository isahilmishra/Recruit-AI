"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";

interface ParsedData {
  skills?: string[];
  experience?: { role: string; company: string; duration: string; summary: string }[];
  education?: { degree: string; institution: string; year: string }[];
}

interface ParsedResumeViewProps {
  data: ParsedData;
  onReset: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export function ParsedResumeView({ data, onReset }: ParsedResumeViewProps) {
  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">AI Profile Analysis</h2>
        </div>
        <button 
          onClick={onReset}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Parse another resume
        </button>
      </motion.div>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Core Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1 text-xs hover:bg-primary/20 transition-colors">
                {skill}
              </Badge>
            ))}
          </div>
        </motion.div>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="h-4 w-4" /> Experience
          </h3>
          <div className="space-y-4 border-l-2 border-primary/20 pl-4 ml-2">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-[25px] top-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                <h4 className="font-semibold text-foreground">{exp.role}</h4>
                <div className="flex items-center text-sm text-muted-foreground gap-2 mb-2">
                  <span className="font-medium">{exp.company}</span>
                  <span>•</span>
                  <span>{exp.duration}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {exp.summary}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Education Section */}
      {data.education && data.education.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> Education
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {data.education.map((edu, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card/50 hover:bg-card transition-colors">
                <h4 className="font-semibold text-sm">{edu.degree}</h4>
                <p className="text-sm text-muted-foreground mt-1">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">{edu.year}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

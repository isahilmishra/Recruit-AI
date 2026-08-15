"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Target, Brain, Briefcase } from "lucide-react";

interface MatchData {
  overallScore: number;
  skillScore: number;
  experienceScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  summary: string;
}

interface MatchScoreViewProps {
  data: MatchData;
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

export function MatchScoreView({ data, onReset }: MatchScoreViewProps) {
  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <motion.div 
      className="space-y-6 mt-6 p-6 border rounded-lg bg-card shadow-sm"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">AI Match Results</h2>
        </div>
        <button 
          onClick={onReset}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Evaluate another job
        </button>
      </motion.div>

      {/* Scores Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 text-center">
        <div className="p-4 rounded-lg bg-background border flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Overall Match</span>
          <span className={`text-4xl font-black ${getScoreColor(data.overallScore)}`}>
            {data.overallScore}%
          </span>
        </div>
        <div className="p-4 rounded-lg bg-background border flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center gap-1"><Brain className="h-3 w-3"/> Skills</span>
          <span className={`text-2xl font-bold ${getScoreColor(data.skillScore)}`}>
            {data.skillScore}%
          </span>
        </div>
        <div className="p-4 rounded-lg bg-background border flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center gap-1"><Briefcase className="h-3 w-3"/> Experience</span>
          <span className={`text-2xl font-bold ${getScoreColor(data.experienceScore)}`}>
            {data.experienceScore}%
          </span>
        </div>
      </motion.div>

      {/* AI Summary */}
      <motion.div variants={itemVariants} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-sm leading-relaxed text-foreground/90 font-medium">
          {data.summary}
        </p>
      </motion.div>

      {/* Skills Analysis */}
      <div className="grid sm:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-green-500 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Matched Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.matchedSkills.length > 0 ? data.matchedSkills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1 text-xs bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
                {skill}
              </Badge>
            )) : <span className="text-sm text-muted-foreground">None identified.</span>}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-destructive uppercase tracking-wider flex items-center gap-2">
            <XCircle className="h-4 w-4" /> Missing Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.missingSkills.length > 0 ? data.missingSkills.map((skill, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 text-xs text-destructive border-destructive/30 bg-destructive/5">
                {skill}
              </Badge>
            )) : <span className="text-sm text-muted-foreground">No critical missing skills!</span>}
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}

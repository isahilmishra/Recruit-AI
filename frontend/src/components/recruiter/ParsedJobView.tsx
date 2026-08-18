"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle2, Star } from "lucide-react";

interface JobData {
  coreRequirements: string[];
  niceToHaves: string[];
  roleSummary: string;
}

interface ParsedJobViewProps {
  data: JobData;
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

export function ParsedJobView({ data, onReset }: ParsedJobViewProps) {
  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">Structured Job Profile</h2>
        </div>
        <button 
          onClick={onReset}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Parse another job
        </button>
      </motion.div>

      {/* Role Summary */}
      <motion.div variants={itemVariants} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-sm leading-relaxed text-foreground/90 font-medium">
          {data.roleSummary}
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Core Requirements Section */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" /> Core Requirements
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.coreRequirements.map((req, index) => (
              <Badge key={index} variant="default" className="px-3 py-1 text-xs">
                {req}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Nice To Haves Section */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" /> Nice to Haves
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.niceToHaves.map((nice, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1 text-xs">
                {nice}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

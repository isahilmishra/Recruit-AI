"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileText, CheckCircle } from "lucide-react";
import { JobAnalyzer } from "@/components/recruiter/JobAnalyzer";
import { ParsedJobView } from "@/components/recruiter/ParsedJobView";
import { TopCandidatesList } from "@/components/recruiter/TopCandidatesList";
import { motion, useAnimation, useInView } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

// Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    
    let totalDuration = 1500;
    let incrementTime = (totalDuration / end);
    
    let timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

export default function RecruiterDashboardPage() {
  const [parsedJob, setParsedJob] = useState<any>(null);
  
  const stats = [
    { title: "Total Candidates", value: 1248, icon: Users, sub: "+12% from last month" },
    { title: "Active Jobs", value: 14, icon: Briefcase, sub: "2 closing this week" },
    { title: "New Applications", value: 42, icon: FileText, sub: "To be reviewed" },
    { title: "Interviews Scheduled", value: 8, icon: CheckCircle, sub: "Next interview in 2 hours" },
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Welcome back. Here's what's happening today.</p>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} variants={itemVariants}>
              <Card className="bg-card/50 backdrop-blur-md border-border/50 hover:border-primary/50 transition-colors shadow-sm hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-black text-foreground">
                    <AnimatedNumber value={stat.value} />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium mt-1">{stat.sub}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="col-span-4"
        >
          <Card className="h-full bg-card/50 backdrop-blur-md border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Job Description Parser</CardTitle>
            </CardHeader>
            <CardContent>
              {parsedJob ? (
                <ParsedJobView 
                  data={parsedJob.analyzedData || parsedJob} 
                  onReset={() => setParsedJob(null)} 
                />
              ) : (
                <>
                  <div className="text-sm text-muted-foreground mb-4 font-medium">
                    Paste a raw job description below. Our AI will extract the core requirements and nice-to-haves automatically.
                  </div>
                  <JobAnalyzer onAnalyzeSuccess={setParsedJob} />
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="col-span-3"
        >
          <Card className="h-full bg-card/50 backdrop-blur-md border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Candidate Matches</CardTitle>
            </CardHeader>
            <CardContent>
              {parsedJob && parsedJob.job ? (
                <TopCandidatesList jobId={parsedJob.job.id} />
              ) : (
                <div className="text-sm text-muted-foreground flex h-[300px] items-center justify-center border border-dashed border-border rounded-xl p-6 text-center bg-muted/20">
                  Parse a job description first to see AI-ranked candidate matches here.
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

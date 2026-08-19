"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Sparkles, ArrowRight, Zap, CheckCircle2, TrendingUp, Briefcase } from "lucide-react";

const springTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 15,
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-32">
      {/* Animated Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/20 blur-[150px] rounded-full pointer-events-none" 
      />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content Column */}
        <div className="text-left space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>The next generation of AI recruiting</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            Hire smarter with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
              Artificial Intelligence
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            Automate resume parsing, instantly rank candidates based on true skill match, and eliminate the manual screening process forever.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springTransition, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 pt-4"
          >
            <Link href="/auth/register" className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1 w-full sm:w-auto" })}>
              Start Hiring for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/auth/login" className={buttonVariants({ variant: "outline", size: "lg", className: "h-14 px-8 text-lg rounded-full bg-background/50 backdrop-blur-sm border-border hover:bg-accent transition-all hover:-translate-y-1 w-full sm:w-auto" })}>
              Apply as a Candidate <Zap className="ml-2 h-5 w-5 text-yellow-500" />
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center gap-6 pt-6 text-sm text-muted-foreground font-medium"
          >
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Setup in 2 mins</div>
          </motion.div>
        </div>

        {/* Right Interactive/Floating UI Mockups Column */}
        <div className="relative hidden lg:block h-[600px] perspective-[2000px]">
          {/* Main App Window Mockup */}
          <motion.div 
            initial={{ opacity: 0, rotateY: 20, x: 100, z: -100 }}
            animate={{ opacity: 1, rotateY: -10, x: 0, z: 0 }}
            transition={{ ...springTransition, duration: 1.5, delay: 0.3 }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-card border border-border/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md"
          >
            <div className="h-10 border-b border-border/50 bg-muted/50 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Senior Frontend Developer</h3>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">124 Applicants</div>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted/30 rounded-lg border border-border/30 flex items-center px-4 gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">{100 - i * 5}%</div>
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-1/3 bg-muted-foreground/20 rounded" />
                      <div className="h-2 w-1/4 bg-muted-foreground/10 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating Detail Card 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 50, z: 100 }}
            animate={{ opacity: 1, y: 0, z: 50 }}
            transition={{ ...springTransition, delay: 0.6 }}
            className="absolute -left-12 bottom-20 bg-card/90 backdrop-blur-xl border border-border p-5 rounded-xl shadow-2xl flex items-center gap-4 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/30">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">98.5%</div>
              <div className="text-sm font-medium text-muted-foreground">Match Accuracy</div>
            </div>
          </motion.div>

          {/* Floating Detail Card 2 */}
          <motion.div 
            initial={{ opacity: 0, y: -50, x: 50, z: 150 }}
            animate={{ opacity: 1, y: 0, x: 0, z: 100 }}
            transition={{ ...springTransition, delay: 0.8 }}
            className="absolute right-10 -top-4 bg-card/90 backdrop-blur-xl border border-border p-4 rounded-xl shadow-2xl hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase">
                <Briefcase className="h-3 w-3" /> AI Parsing
              </div>
              <div className="h-2 w-40 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                  className="h-full bg-primary"
                />
              </div>
              <div className="text-xs text-primary font-medium flex justify-between">
                <span>Extracting Skills...</span>
                <span>Done</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

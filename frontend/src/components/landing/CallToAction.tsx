"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CallToAction() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto text-center space-y-8 bg-card/50 backdrop-blur-xl border border-border/50 p-12 rounded-3xl shadow-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Ready to hire the top 1%?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join the waitlist of modern recruiting teams using RecruitAI to eliminate manual screening.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full">
            <Link href="/auth/register">Get Started Now</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

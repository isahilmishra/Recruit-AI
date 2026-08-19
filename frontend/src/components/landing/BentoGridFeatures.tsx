"use client";

import { motion } from "framer-motion";
import { FileSearch, Zap, Layers, BarChart3, Users, ShieldCheck, Mail, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Instant Resume Parsing",
    description: "Our LLM engine reads resumes like a human, instantly structuring unstructured text into skills, experience, and education.",
    icon: FileSearch,
    className: "md:col-span-2",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "Skill-Based Matching",
    description: "We don't just keyword match. The AI understands the context of a candidate's experience.",
    icon: Zap,
    className: "md:col-span-1",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    title: "Automated Pipelines",
    description: "Drag and drop candidates across stages, with automated email sequences at every step.",
    icon: Layers,
    className: "md:col-span-1",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Bias-Free Shortlisting",
    description: "Focus on what matters: the actual skills and the match score.",
    icon: ShieldCheck,
    className: "md:col-span-1",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Integrated Scheduling",
    description: "Schedule interviews with one click. Automatic calendar syncing and video links.",
    icon: Calendar,
    className: "md:col-span-1",
    gradient: "from-indigo-500/20 to-blue-500/20",
  },
];

export function BentoGridFeatures() {
  return (
    <section className="py-32 px-4 relative max-w-6xl mx-auto">
      <div className="text-center mb-20 space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight"
        >
          Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">scale your team</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          RecruitAI gives you an unfair advantage in the talent market by automating the most tedious parts of hiring.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1 
              }}
              className={feature.className}
            >
              <div className="group relative h-full rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-primary/50 transition-colors duration-500">
                {/* Hover Gradient Background Reveal */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out`} />
                
                <div className="relative p-8 h-full flex flex-col">
                  <div className="h-14 w-14 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/50 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

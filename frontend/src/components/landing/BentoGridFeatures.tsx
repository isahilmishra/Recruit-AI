"use client";

import { motion } from "framer-motion";
import { FileSearch, Zap, Layers, BarChart3, Users, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Instant Resume Parsing",
    description: "Our LLM engine reads resumes like a human, instantly structuring unstructured text into skills, experience, and education.",
    icon: FileSearch,
    className: "md:col-span-2",
  },
  {
    title: "Skill-Based Matching",
    description: "We don't just keyword match. The AI understands the context of a candidate's experience.",
    icon: Zap,
    className: "md:col-span-1",
  },
  {
    title: "Automated Pipelines",
    description: "Drag and drop candidates across stages, with automated email sequences at every step.",
    icon: Layers,
    className: "md:col-span-1",
  },
  {
    title: "Bias-Free Shortlisting",
    description: "Focus on what matters: the actual skills and the match score.",
    icon: ShieldCheck,
    className: "md:col-span-2",
  },
];

export function BentoGridFeatures() {
  return (
    <section className="py-24 px-4 relative max-w-6xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to scale your team</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          RecruitAI gives you an unfair advantage in the talent market by automating the most tedious parts of hiring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={feature.className}
            >
              <Card className="h-full bg-card/40 backdrop-blur-md border-border/50 hover:bg-card/80 transition-all duration-300 overflow-hidden group">
                <CardContent className="p-8 space-y-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

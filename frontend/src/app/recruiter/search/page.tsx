"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Search, Sparkles, UserCircle2, Mail, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function RecruiterSearchPage() {
  const { token } = useAuth();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:5000/api/recruiters/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ query }),
      });
      
      const data = await response.json();
      
      if (!response.ok || data.status === 'error') {
        throw new Error(data.message || "Search failed");
      }
      
      setResults(data.data || []);
    } catch (err: any) {
      setError(err.message);
      setResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500/10 text-green-500 border-green-500/20";
    if (score >= 60) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          AI Candidate Search <Sparkles className="h-6 w-6 text-primary" />
        </h1>
        <p className="text-muted-foreground mt-1 text-lg">
          Describe your ideal candidate in plain English. The AI will semantically scan all resumes in your pipeline.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-lg">
        <CardContent className="p-6">
          <div className="relative">
            <Textarea 
              placeholder="e.g., 'Find me a backend developer who knows Node.js, has over 3 years of experience, and has worked in fintech...'"
              className="min-h-[120px] text-lg resize-y pr-24 bg-background/50 focus:bg-background transition-colors placeholder:text-muted-foreground/60"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
              <Button 
                onClick={handleSearch} 
                disabled={isSearching || !query.trim()}
                className="shadow-md"
              >
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Search
              </Button>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20 font-medium">
              {error}
            </div>
          )}
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {results !== null && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 mt-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {results.length} Match{results.length !== 1 ? 'es' : ''} Found
              </h2>
            </div>

            {results.length === 0 ? (
              <Card className="bg-card/30 border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center h-48 text-muted-foreground text-center">
                  <UserCircle2 className="h-12 w-12 mb-3 opacity-20" />
                  <p className="font-medium text-lg text-foreground/70">No matching candidates found.</p>
                  <p className="text-sm mt-1">Try broadening your search query or using different keywords.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {results.map((app, i) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="hover:shadow-md transition-all border-l-4 border-l-primary group">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                  {app.candidate.user.name}
                                </h3>
                                <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                                  <Badge variant="secondary" className="font-medium">{app.job.title}</Badge>
                                  <span>•</span>
                                  <a href={`mailto:${app.candidate.user.email}`} className="text-sm hover:text-primary transition-colors flex items-center gap-1">
                                    <Mail className="h-3 w-3" /> {app.candidate.user.email}
                                  </a>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <Badge variant="outline" className={`${getScoreColor(app.searchMatch.score)} px-3 py-1 text-sm font-bold shadow-sm`}>
                                  {app.searchMatch.score}% Match
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="mt-4 bg-primary/5 p-4 rounded-lg border border-primary/10">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                                <Sparkles className="h-3 w-3" /> Why they match
                              </h4>
                              <p className="text-sm text-foreground/90 leading-relaxed">
                                {app.searchMatch.reason}
                              </p>
                            </div>
                          </div>
                          
                          <div className="md:w-48 shrink-0 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                            <Button variant="default" className="w-full">
                              View Profile
                            </Button>
                            <Button variant="outline" className="w-full group-hover:bg-muted">
                              Message <ExternalLink className="ml-2 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

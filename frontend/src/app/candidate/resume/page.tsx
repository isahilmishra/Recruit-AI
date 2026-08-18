"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeUploader } from "@/components/candidate/ResumeUploader";
import { ParsedResumeView } from "@/components/candidate/ParsedResumeView";
import { MatchEvaluator } from "@/components/candidate/MatchEvaluator";
import { MatchScoreView } from "@/components/candidate/MatchScoreView";

export default function CandidateResumePage() {
  const [parsedData, setParsedData] = useState<any>(null);
  const [matchData, setMatchData] = useState<any>(null);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Resume</h1>
        <p className="text-muted-foreground">Upload and manage your parsed resume profile.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 bg-muted/30">
          <CardTitle>AI Resume Parser</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {parsedData ? (
            <>
              <ParsedResumeView 
                data={parsedData} 
                onReset={() => {
                  setParsedData(null);
                  setMatchData(null);
                }} 
              />
              
              {matchData ? (
                <MatchScoreView 
                  data={matchData} 
                  onReset={() => setMatchData(null)} 
                />
              ) : (
                <MatchEvaluator 
                  resumeData={parsedData} 
                  onMatchSuccess={setMatchData} 
                />
              )}
            </>
          ) : (
            <>
              <div className="text-sm text-muted-foreground mb-4">
                Paste your resume text below to let AI extract your skills, experience, and education. We use this structured profile to match you with the best roles.
              </div>
              <ResumeUploader onParseSuccess={setParsedData} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

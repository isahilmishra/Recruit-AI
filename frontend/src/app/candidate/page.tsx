"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle } from "lucide-react";
import { ResumeUploader } from "@/components/candidate/ResumeUploader";
import { ParsedResumeView } from "@/components/candidate/ParsedResumeView";
import { MatchEvaluator } from "@/components/candidate/MatchEvaluator";
import { MatchScoreView } from "@/components/candidate/MatchScoreView";

export default function CandidateDashboardPage() {
  const [parsedData, setParsedData] = useState<any>(null);
  const [matchData, setMatchData] = useState<any>(null);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome, Applicant</h1>
        <p className="text-muted-foreground">Track your applications and resume status.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">Your recent job applications will appear here.</div>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>My Resume</CardTitle>
          </CardHeader>
          <CardContent>
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
                  Upload your resume to let AI parse your profile and match you with relevant jobs.
                </div>
                <ResumeUploader onParseSuccess={setParsedData} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

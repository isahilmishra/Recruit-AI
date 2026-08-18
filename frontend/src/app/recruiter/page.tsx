"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FileText, CheckCircle } from "lucide-react";
import { JobAnalyzer } from "@/components/recruiter/JobAnalyzer";
import { ParsedJobView } from "@/components/recruiter/ParsedJobView";
import { TopCandidatesList } from "@/components/recruiter/TopCandidatesList";

export default function RecruiterDashboardPage() {
  const [parsedJob, setParsedJob] = useState<any>(null);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">2 closing this week</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">To be reviewed</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews Scheduled</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Next interview in 2 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/50 backdrop-blur-sm border-border">
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
                <div className="text-sm text-muted-foreground mb-4">
                  Paste a raw job description below. Our AI will extract the core requirements and nice-to-haves automatically.
                </div>
                <JobAnalyzer onAnalyzeSuccess={setParsedJob} />
              </>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader>
            <CardTitle>Candidate Matches</CardTitle>
          </CardHeader>
          <CardContent>
            {parsedJob && parsedJob.job ? (
              <TopCandidatesList jobId={parsedJob.job.id} />
            ) : (
              <div className="text-sm text-muted-foreground flex h-[300px] items-center justify-center border border-dashed rounded-lg p-6 text-center">
                Parse a job description first to see AI-ranked candidate matches here.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

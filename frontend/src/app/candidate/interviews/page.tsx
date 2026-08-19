"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Calendar as CalendarIcon, Video, Clock, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function CandidateInterviewsPage() {
  const { token } = useAuth();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/candidates/interviews`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` })
          }
        });
        const result = await response.json();
        if (!response.ok || result.status === 'error') {
          throw new Error(result.message || "Failed to fetch interviews.");
        }

        setInterviews(result.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchInterviews();
    }
  }, [token]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Interviews</h1>
        <p className="text-muted-foreground">Keep track of your upcoming interviews with employers.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="text-destructive p-4 bg-destructive/10 rounded-md border border-destructive/20">
          {error}
        </div>
      ) : interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-muted/30 border border-border/50 rounded-xl text-center">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <CalendarIcon className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No upcoming interviews</h3>
          <p className="text-muted-foreground max-w-md">
            You don't have any scheduled interviews right now. Keep applying to jobs and checking your applications board!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {interviews.map(interview => (
            <Card key={interview.id} className="overflow-hidden border-border bg-card hover:border-primary/30 transition-colors">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left Column: Date & Time */}
                  <div className="md:w-64 bg-primary/5 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <CalendarIcon className="h-5 w-5" />
                      <span className="font-bold text-lg">{format(new Date(interview.scheduledAt), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{format(new Date(interview.scheduledAt), 'h:mm a')} ({interview.duration} mins)</span>
                    </div>
                  </div>

                  {/* Right Column: Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-1">
                            {interview.application.job.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span>{interview.application.job.company}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {interview.status}
                        </Badge>
                      </div>

                      <div className="space-y-1 mb-4">
                        <p className="text-sm text-foreground">
                          <span className="text-muted-foreground">Interviewer: </span>
                          {interview.recruiter.user.name}
                        </p>
                        <p className="text-sm text-foreground">
                          <span className="text-muted-foreground">Contact: </span>
                          <a href={`mailto:${interview.recruiter.user.email}`} className="text-primary hover:underline">
                            {interview.recruiter.user.email}
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-start pt-4 border-t border-border">
                      {interview.meetingLink ? (
                        <a 
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium text-sm transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30"
                        >
                          <Video className="h-4 w-4" />
                          Join Interview
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-muted text-muted-foreground rounded-md font-medium text-sm">
                          <Video className="h-4 w-4" />
                          Meeting link will be provided soon
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

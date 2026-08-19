"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Calendar as CalendarIcon, Video, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function RecruiterInterviewsPage() {
  const { token } = useAuth();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruiters/interviews`, {
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
        <h1 className="text-2xl font-bold text-foreground">Upcoming Interviews</h1>
        <p className="text-muted-foreground">Manage your scheduled interviews across all jobs.</p>
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
            You don't have any interviews scheduled yet. You can schedule them from the Pipeline Board.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {interviews.map(interview => (
            <Card key={interview.id} className="overflow-hidden border-border bg-card">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {/* Left Column: Date & Time */}
                  <div className="md:w-64 bg-muted/40 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span className="font-semibold">{format(new Date(interview.scheduledAt), 'MMM d, yyyy')}</span>
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
                          <h3 className="text-lg font-bold text-foreground">
                            {interview.candidate.user.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Applying for <span className="font-medium text-foreground">{interview.application.job.title}</span>
                          </p>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {interview.status}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>Email: {interview.candidate.user.email}</span>
                      </div>
                      
                      {interview.notes && (
                        <div className="bg-muted p-3 rounded-md text-sm text-muted-foreground mb-4">
                          <span className="font-medium text-foreground">Notes:</span> {interview.notes}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-border">
                      {interview.meetingLink ? (
                        <a 
                          href={interview.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md font-medium text-sm transition-colors"
                        >
                          <Video className="h-4 w-4" />
                          Join Meeting
                        </a>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">No meeting link provided</span>
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

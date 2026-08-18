import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function RecruiterInterviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Interviews</h1>
        <p className="text-muted-foreground">Manage your interview schedules and feedback.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border flex flex-col items-center justify-center h-[400px] text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <CardTitle>Interview Scheduling is coming soon</CardTitle>
        <CardDescription className="max-w-md mt-2">
          Sync your calendar to automate interview scheduling with candidates and collect structured feedback from your hiring team.
        </CardDescription>
      </Card>
    </div>
  );
}

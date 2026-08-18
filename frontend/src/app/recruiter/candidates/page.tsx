import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function RecruiterCandidatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Candidates Pipeline</h1>
        <p className="text-muted-foreground">Manage and track candidates across all your open jobs.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border flex flex-col items-center justify-center h-[400px] text-center">
        <Users className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <CardTitle>Candidates Pipeline view is coming soon</CardTitle>
        <CardDescription className="max-w-md mt-2">
          This feature will allow you to drag and drop candidates through different stages (e.g. Sourced, Screened, Interview, Offer). For now, view candidates directly on your dashboard.
        </CardDescription>
      </Card>
    </div>
  );
}

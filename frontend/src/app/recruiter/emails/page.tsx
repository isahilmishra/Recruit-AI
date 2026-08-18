import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send } from "lucide-react";

export default function RecruiterEmailsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Email Sequences</h1>
        <p className="text-muted-foreground">Automate your candidate outreach.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border flex flex-col items-center justify-center h-[400px] text-center">
        <Send className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
        <CardTitle>Email Campaigns are coming soon</CardTitle>
        <CardDescription className="max-w-md mt-2">
          Create automated email sequences for sourcing candidates and managing rejections/offers with variables.
        </CardDescription>
      </Card>
    </div>
  );
}

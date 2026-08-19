import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Wand2, Send } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
  candidateName: string;
}

export function EmailModal({ isOpen, onClose, applicationId, candidateName }: EmailModalProps) {
  const { token } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDraft = async () => {
    if (!prompt) return;
    setIsDrafting(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruiters/applications/${applicationId}/draft-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      const result = await response.json();
      if (!response.ok || result.status === 'error') throw new Error(result.message);
      
      setBody(result.data.draftedBody);
      if (!subject) setSubject(`Update on your application with RecruitAI`);
    } catch (err: any) {
      setError(err.message || "Failed to draft email");
    } finally {
      setIsDrafting(false);
    }
  };

  const handleSend = async () => {
    if (!subject || !body) return;
    setIsSending(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recruiters/applications/${applicationId}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, body }),
      });
      const result = await response.json();
      if (!response.ok || result.status === 'error') throw new Error(result.message);
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setPrompt("");
        setSubject("");
        setBody("");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to send email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Email {candidateName}</DialogTitle>
          <DialogDescription>
            Use AI to draft a context-aware email, or write your own.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20">
            {error}
          </div>
        )}

        {success ? (
          <div className="p-8 text-center text-green-500 flex flex-col items-center">
            <Send className="h-12 w-12 mb-4 text-green-500" />
            <p className="text-lg font-semibold">Email Sent Successfully!</p>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>AI Prompt (Optional)</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g. Schedule a 30 min tech screen for next Tuesday" 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button variant="secondary" onClick={handleDraft} disabled={isDrafting || !prompt}>
                  {isDrafting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Wand2 className="h-4 w-4 mr-2" />}
                  Draft
                </Button>
              </div>
            </div>

            <div className="grid gap-2 mt-4">
              <Label>Subject</Label>
              <Input 
                placeholder="Email Subject" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Message Body</Label>
              <Textarea 
                rows={8}
                placeholder="Write your email here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          </div>
        )}

        {!success && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSend} disabled={isSending || !subject || !body}>
              {isSending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              Send Email
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

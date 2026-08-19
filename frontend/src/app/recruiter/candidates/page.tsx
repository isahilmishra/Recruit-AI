"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, UserCircle2, GripVertical, Mail, Calendar } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { EmailModal } from "@/components/recruiter/EmailModal";
import { Skeleton } from "@/components/ui/skeleton";
import ScheduleInterviewModal from "@/components/recruiter/ScheduleInterviewModal";

// Prisma Enum
const ApplicationStatusList = [
  "APPLIED",
  "AI_REVIEW",
  "RECRUITER_REVIEW",
  "SHORTLISTED",
  "INTERVIEW",
  "OFFER",
  "HIRED",
  "REJECTED"
] as const;

type ApplicationStatus = typeof ApplicationStatusList[number];

interface Candidate {
  id: string;
  name: string;
  email: string;
}

interface Application {
  id: string;
  status: ApplicationStatus;
  candidate: {
    user: {
      name: string;
      email: string;
    };
  };
  job: {
    title: string;
  };
  evaluation?: {
    overallScore: number;
    skillScore: number;
  };
}

export default function RecruiterCandidatesPage() {
  const { token } = useAuth();
  const [columns, setColumns] = useState<Record<ApplicationStatus, Application[]>>({} as any);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAppForEmail, setSelectedAppForEmail] = useState<Application | null>(null);
  const [selectedAppForInterview, setSelectedAppForInterview] = useState<Application | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/recruiters/applications", {
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });
      const result = await response.json();
      if (!response.ok || result.status === 'error') {
        throw new Error(result.message || "Failed to fetch candidates.");
      }

      const data: Application[] = result.data;
      
      const initialColumns: Record<ApplicationStatus, Application[]> = {} as any;
      ApplicationStatusList.forEach(status => {
        initialColumns[status] = [];
      });

      const grouped = { ...initialColumns };
      data.forEach(app => {
        if (grouped[app.status]) {
          grouped[app.status].push(app);
        }
      });
      setColumns(grouped);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return; // No change
    }

    const sourceStatus = source.droppableId as ApplicationStatus;
    const destStatus = destination.droppableId as ApplicationStatus;

    // Optimistic UI Update
    const sourceCol = [...columns[sourceStatus]];
    const destCol = [...columns[destStatus]];
    const [movedApp] = sourceCol.splice(source.index, 1);
    
    // Update local status so it renders correctly if it re-renders
    movedApp.status = destStatus;
    
    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, movedApp);
      setColumns({
        ...columns,
        [sourceStatus]: sourceCol
      });
    } else {
      destCol.splice(destination.index, 0, movedApp);
      setColumns({
        ...columns,
        [sourceStatus]: sourceCol,
        [destStatus]: destCol
      });
    }

    // Persist to backend
    try {
      const response = await fetch(`http://localhost:5000/api/recruiters/applications/${movedApp.id}/status`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ status: destStatus })
      });
      
      const result = await response.json();
      if (!response.ok || result.status === 'error') {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      // Ideally revert the optimistic update here
    }
  };

  const handleScheduleInterview = async (data: any) => {
    if (!selectedAppForInterview) return;
    setIsScheduling(true);
    try {
      const res = await fetch(`http://localhost:5000/api/recruiters/applications/${selectedAppForInterview.id}/interviews`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      
      // Successfully scheduled, now refresh the board to show it moved to INTERVIEW column
      await fetchApplications();
      setSelectedAppForInterview(null);
    } catch (error) {
      console.error(error);
      alert('Failed to schedule interview');
    } finally {
      setIsScheduling(false);
    }
  };

  const activeColumns = ApplicationStatusList.filter(s => s !== "APPLIED"); // Hide APPLIED as they go to AI_REVIEW instantly

  const getScoreColor = (score?: number) => {
    if (!score) return "bg-muted text-muted-foreground";
    if (score >= 8) return "bg-green-500/10 text-green-500 border-green-500/20";
    if (score >= 5) return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  // Skeleton Loader for columns
  const ColumnSkeleton = () => (
    <div className="flex gap-4 overflow-x-auto pb-4 px-1 min-h-[calc(100vh-200px)]">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex-shrink-0 w-80 flex flex-col bg-muted/30 rounded-xl border border-border/50">
          <div className="p-4 border-b border-border/50 bg-muted/50 rounded-t-xl">
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="p-3 space-y-3">
            {[1, 2, 3].map((j) => (
              <Card key={j} className="overflow-hidden shadow-sm border-border">
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex justify-between mt-4">
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-6 rounded-md" />
                      <Skeleton className="h-6 w-6 rounded-md" />
                    </div>
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Pipeline Board</h1>
        <p className="text-muted-foreground mt-1">Drag and drop candidates across stages.</p>
      </motion.div>

      {isLoading ? (
        <ColumnSkeleton />
      ) : error ? (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
          className="text-destructive p-4 bg-destructive/10 rounded-md border border-destructive/20"
        >
          {error}
        </motion.div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex gap-4 overflow-x-auto pb-4 px-1 min-h-[calc(100vh-200px)] custom-scrollbar"
          >
            {activeColumns.map((status, index) => (
              <motion.div 
                key={status} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex-shrink-0 w-80 flex flex-col bg-muted/20 backdrop-blur-sm rounded-xl border border-border/50 shadow-sm"
              >
                <div className="p-4 border-b border-border/50 bg-card rounded-t-xl flex justify-between items-center shadow-sm z-10 relative">
                  <h3 className="font-bold text-sm tracking-tight text-foreground/80 flex items-center gap-2">
                    {status.replace("_", " ")}
                  </h3>
                  <Badge variant="secondary" className="rounded-full w-6 h-6 flex items-center justify-center p-0 font-bold bg-primary/10 text-primary border-primary/20">
                    {columns[status]?.length || 0}
                  </Badge>
                </div>

                <Droppable droppableId={status}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-1 p-3 space-y-3 transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-primary/5' : ''}`}
                    >
                      {columns[status]?.map((app, index) => (
                        <Draggable key={app.id} draggableId={app.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="relative"
                              style={{ ...provided.draggableProps.style }}
                            >
                              <Card 
                                className={`group overflow-hidden transition-all duration-200 border-border/50 ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-primary scale-105 rotate-2 z-50 bg-card' : 'shadow-sm hover:shadow-md hover:border-primary/30 bg-card/80 backdrop-blur-sm'}`}
                              >
                                <CardContent className="p-4 relative">
                                  <div 
                                    {...provided.dragHandleProps}
                                    className="absolute left-2 top-0 bottom-0 flex items-center opacity-0 group-hover:opacity-50 hover:opacity-100 cursor-grab active:cursor-grabbing transition-opacity"
                                  >
                                    <GripVertical className="h-4 w-4" />
                                  </div>
                                  
                                  <div className="pl-4">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h4 className="font-semibold text-foreground text-sm line-clamp-1">
                                          {app.candidate.user.name}
                                        </h4>
                                        <p className="text-xs text-muted-foreground font-medium line-clamp-1 mt-0.5">
                                          {app.job.title}
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mt-4">
                                      <div className="flex gap-1.5">
                                        <button 
                                          onClick={() => setSelectedAppForEmail(app)}
                                          className="text-muted-foreground hover:text-primary transition-colors bg-muted hover:bg-primary/10 p-1.5 rounded-md"
                                        >
                                          <Mail className="h-3.5 w-3.5" />
                                        </button>
                                        <button 
                                          onClick={() => setSelectedAppForInterview(app)}
                                          className="text-muted-foreground hover:text-primary transition-colors bg-muted hover:bg-primary/10 p-1.5 rounded-md"
                                        >
                                          <Calendar className="h-3.5 w-3.5" />
                                        </button>
                                      </div>
                                      
                                      <Badge variant="outline" className={`${getScoreColor(app.evaluation?.overallScore)} px-2 py-0.5 text-xs font-bold`}>
                                        Match: {app.evaluation?.overallScore ? `${Math.round(app.evaluation.overallScore)}%` : 'N/A'}
                                      </Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </motion.div>
            ))}
          </motion.div>
        </DragDropContext>
      )}

      {selectedAppForEmail && (
        <EmailModal 
          isOpen={!!selectedAppForEmail} 
          onClose={() => setSelectedAppForEmail(null)} 
          applicationId={selectedAppForEmail.id} 
          candidateName={selectedAppForEmail.candidate.user.name} 
        />
      )}

      {selectedAppForInterview && (
        <ScheduleInterviewModal
          isOpen={!!selectedAppForInterview}
          onClose={() => setSelectedAppForInterview(null)}
          onSubmit={handleScheduleInterview}
          isLoading={isScheduling}
        />
      )}
    </div>
  );
}

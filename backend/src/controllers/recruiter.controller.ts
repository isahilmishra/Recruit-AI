import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { analyzeJobDescription, generateEmail, semanticSearchCandidates } from '../utils/ai';
import { jobQueue } from '../utils/queue';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export class RecruiterController {
  static async createJob(req: Request, res: Response, next: NextFunction) {
    try {
      const { text, title = "Untitled Job" } = req.body;
      const userId = req.user?.userId;

      if (!text) {
        throw new AppError('Job description text is required', 400);
      }

      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      // Find recruiter profile
      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId }
      });

      if (!recruiterProfile) {
        throw new AppError('Recruiter profile not found', 404);
      }

      // Push to queue
      const job = await jobQueue.add('parse-job', {
        text,
        title,
        userId
      });

      res.status(202).json({
        status: 'success',
        data: {
          jobId: job.id,
          message: 'Job queued for processing'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getJobCreationStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const jobId = req.params.jobId as string;
      const job = await jobQueue.getJob(jobId);

      if (!job) {
        throw new AppError('Job not found', 404);
      }

      const isCompleted = await job.isCompleted();
      const isFailed = await job.isFailed();

      if (isCompleted) {
        return res.status(200).json({
          status: 'success',
          data: {
            status: 'COMPLETED',
            result: job.returnvalue
          }
        });
      }

      if (isFailed) {
        return res.status(200).json({
          status: 'success',
          data: {
            status: 'FAILED',
            error: job.failedReason
          }
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          status: 'PENDING'
        }
      });
    } catch (error) {
      next(error);
    }
  }

  static async getJobCandidates(req: Request, res: Response, next: NextFunction) {
    try {
      const jobId = req.params.jobId as string;
      const userId = req.user?.userId;

      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      // Ensure the recruiter owns this job
      const recruiterProfile = await prisma.recruiterProfile.findUnique({ where: { userId } });
      if (!recruiterProfile) {
        throw new AppError('Recruiter not found', 404);
      }

      const job = await prisma.job.findFirst({
        where: { id: jobId, recruiterId: recruiterProfile.id }
      });

      if (!job) {
        throw new AppError('Job not found or unauthorized', 404);
      }

      const applications = await prisma.application.findMany({
        where: { jobId },
        include: {
          candidate: {
            include: { user: { select: { name: true, email: true } } }
          },
          evaluation: true
        },
        orderBy: {
          evaluation: { overallScore: 'desc' } // Sort by match score
        }
      });

      res.status(200).json({ status: 'success', data: applications });
    } catch (error) {
      next(error);
    }
  }

  static async getJobs(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new AppError('Unauthorized', 401);

      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId }
      });

      if (!recruiterProfile) {
        return res.status(200).json({ status: 'success', data: [] });
      }

      const jobs = await prisma.job.findMany({
        where: { recruiterId: recruiterProfile.id },
        include: { applications: true },
        orderBy: { createdAt: 'desc' }
      });

      res.status(200).json({ status: 'success', data: jobs });
    } catch (error) {
      next(error);
    }
  }

  static async getAllApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new AppError('Unauthorized', 401);

      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId }
      });

      if (!recruiterProfile) {
        return res.status(200).json({ status: 'success', data: [] });
      }

      const applications = await prisma.application.findMany({
        where: {
          job: {
            recruiterId: recruiterProfile.id
          }
        },
        include: {
          candidate: {
            include: {
              user: { select: { name: true, email: true } }
            }
          },
          job: { select: { title: true } },
          evaluation: true
        },
        orderBy: { appliedAt: 'desc' }
      });

      res.status(200).json({ status: 'success', data: applications });
    } catch (error) {
      next(error);
    }
  }

  static async updateApplicationStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const status = req.body.status as any;
      const userId = req.user?.userId;

      if (!userId) throw new AppError('Unauthorized', 401);

      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId }
      });

      if (!recruiterProfile) {
        throw new AppError('Recruiter profile not found', 404);
      }

      // Ensure the application belongs to a job owned by this recruiter
      const existingApplication = await prisma.application.findUnique({
        where: { id },
        include: { job: true }
      });

      if (!existingApplication) {
        throw new AppError('Application not found', 404);
      }

      if (existingApplication.job.recruiterId !== recruiterProfile.id) {
        throw new AppError('Forbidden. You do not own this job.', 403);
      }

      // Update the status and create history record
      const updatedApplication = await prisma.$transaction(async (tx) => {
        const app = await tx.application.update({
          where: { id },
          data: { status }
        });

        await tx.applicationStatusHistory.create({
          data: {
            applicationId: id,
            oldStatus: existingApplication.status,
            newStatus: status,
            changedBy: userId
          }
        });

        return app;
      });

      res.status(200).json({ status: 'success', data: updatedApplication });
    } catch (error) {
      next(error);
    }
  }

  static async draftEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { prompt } = req.body;
      const userId = req.user?.userId;

      if (!userId) throw new AppError('Unauthorized', 401);

      const existingApplication: any = await prisma.application.findUnique({
        where: { id },
        include: { 
          candidate: { include: { user: true } },
          job: { include: { recruiter: true } }
        }
      });

      if (!existingApplication) {
        throw new AppError('Application not found', 404);
      }

      if (existingApplication.job.recruiter.userId !== userId) {
        throw new AppError('Forbidden. You do not own this job.', 403);
      }

      const candidateName = existingApplication.candidate.user.name;
      const draftedBody = await generateEmail(prompt, candidateName);

      res.status(200).json({ status: 'success', data: { draftedBody } });
    } catch (error) {
      next(error);
    }
  }

  static async sendEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string;
      const { subject, body } = req.body;
      const userId = req.user?.userId;

      if (!userId) throw new AppError('Unauthorized', 401);

      const existingApplication: any = await prisma.application.findUnique({
        where: { id },
        include: { 
          candidate: { include: { user: true } },
          job: { include: { recruiter: true } }
        }
      });

      if (!existingApplication) {
        throw new AppError('Application not found', 404);
      }

      if (existingApplication.job.recruiter.userId !== userId) {
        throw new AppError('Forbidden. You do not own this job.', 403);
      }

      const candidateEmail = existingApplication.candidate.user.email;
      const companyName = existingApplication.job.recruiter.companyName;

      if (!process.env.RESEND_API_KEY) {
        console.log('--- MOCK EMAIL SEND ---');
        console.log(`To: ${candidateEmail}`);
        console.log(`From: recruitment@${companyName.replace(/\s+/g, '').toLowerCase()}.com`);
        console.log(`Subject: ${subject}`);
        console.log(`Body: \n${body}`);
        console.log('-----------------------');
        
        return res.status(200).json({ status: 'success', message: 'Email sent (mocked)' });
      }

      // Actually send using Resend
      const { data, error } = await resend.emails.send({
        from: `RecruitAI <onboarding@resend.dev>`, // Resend testing domain
        to: [candidateEmail],
        subject: subject,
        text: body,
      });

      if (error) {
        throw new AppError(`Failed to send email: ${error.message}`, 500);
      }

      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  static async searchCandidates(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req.body;
      const userId = req.user?.userId;

      if (!userId) throw new AppError('Unauthorized', 401);
      if (!query) throw new AppError('Search query is required', 400);

      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId }
      });

      if (!recruiterProfile) {
        throw new AppError('Recruiter profile not found', 404);
      }

      // Fetch all applications for jobs owned by this recruiter
      const applications = await prisma.application.findMany({
        where: {
          job: {
            recruiterId: recruiterProfile.id
          }
        },
        include: {
          candidate: {
            include: {
              user: { select: { name: true, email: true } }
            }
          },
          job: { select: { title: true } }
        }
      });

      if (applications.length === 0) {
        return res.status(200).json({ status: 'success', data: [] });
      }

      // Prepare condensed payload for AI
      const candidatesPayload = applications.map(app => ({
        applicationId: app.id,
        candidateName: app.candidate.user.name,
        appliedForJob: app.job.title,
        skills: app.candidate.skills,
        experience: app.candidate.experience,
        education: app.candidate.education
      }));

      // Call AI
      const searchResult = await semanticSearchCandidates(query, candidatesPayload);

      if (!searchResult || !searchResult.matches) {
        return res.status(200).json({ status: 'success', data: [] });
      }

      // Map back to full application objects and attach match info
      const enrichedResults = searchResult.matches.map((match: any) => {
        const fullApp = applications.find(a => a.id === match.applicationId);
        return {
          ...fullApp,
          searchMatch: {
            score: match.score,
            reason: match.reason
          }
        };
      }).filter((r: any) => r.id); // Filter out any undefined matches just in case

      res.status(200).json({ status: 'success', data: enrichedResults });
    } catch (error) {
      next(error);
    }
  }

  static async scheduleInterview(req: Request, res: Response, next: NextFunction) {
    try {
      const applicationId = req.params.id as string;
      const { scheduledAt, duration, meetingLink, notes } = req.body;
      const userId = req.user?.userId;

      if (!userId) throw new AppError('Unauthorized', 401);
      if (!scheduledAt) throw new AppError('Scheduled time is required', 400);

      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId }
      });

      if (!recruiterProfile) throw new AppError('Recruiter profile not found', 404);

      const application = await prisma.application.findUnique({
        where: { id: applicationId },
        include: { job: true, candidate: { include: { user: true } } }
      });

      if (!application) throw new AppError('Application not found', 404);
      if (application.job.recruiterId !== recruiterProfile.id) {
        throw new AppError('Forbidden. You do not own this job.', 403);
      }

      const interview = await prisma.$transaction(async (tx) => {
        // Upsert interview (in case one already exists for this application)
        const intv = await tx.interview.upsert({
          where: { applicationId },
          update: { scheduledAt: new Date(scheduledAt), duration, meetingLink, notes, status: 'SCHEDULED' },
          create: {
            applicationId,
            recruiterId: recruiterProfile.id,
            candidateId: application.candidateId,
            scheduledAt: new Date(scheduledAt),
            duration,
            meetingLink,
            notes,
            status: 'SCHEDULED'
          }
        });

        // Update application status to INTERVIEW
        await tx.application.update({
          where: { id: applicationId },
          data: { status: 'INTERVIEW' }
        });

        // Log status change
        await tx.applicationStatusHistory.create({
          data: {
            applicationId,
            oldStatus: application.status,
            newStatus: 'INTERVIEW',
            changedBy: userId
          }
        });

        return intv;
      });

      res.status(200).json({ status: 'success', data: interview });
    } catch (error) {
      next(error);
    }
  }

  static async getInterviews(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new AppError('Unauthorized', 401);

      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId }
      });

      if (!recruiterProfile) {
        return res.status(200).json({ status: 'success', data: [] });
      }

      const interviews = await prisma.interview.findMany({
        where: { recruiterId: recruiterProfile.id },
        include: {
          candidate: { include: { user: { select: { name: true, email: true } } } },
          application: { include: { job: { select: { title: true, company: true } } } }
        },
        orderBy: { scheduledAt: 'asc' }
      });

      res.status(200).json({ status: 'success', data: interviews });
    } catch (error) {
      next(error);
    }
  }
}

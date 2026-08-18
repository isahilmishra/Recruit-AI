import { Request, Response, NextFunction } from 'express';
import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { analyzeJobDescription } from '../utils/ai';

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

      // Parse with AI
      const analyzedData = await analyzeJobDescription(text);

      // Save to Database
      const job = await prisma.job.create({
        data: {
          recruiterId: recruiterProfile.id,
          title: title,
          company: recruiterProfile.companyName,
          description: text,
          requirements: analyzedData.coreRequirements || [],
          preferredSkills: analyzedData.niceToHaves || [],
          status: "OPEN"
        }
      });

      res.status(201).json({
        status: 'success',
        data: {
          job,
          analyzedData
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
}

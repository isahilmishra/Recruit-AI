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
      const { jobId } = req.params;
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

      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const recruiterProfile = await prisma.recruiterProfile.findUnique({ where: { userId } });
      if (!recruiterProfile) {
        throw new AppError('Recruiter not found', 404);
      }

      const jobs = await prisma.job.findMany({
        where: { recruiterId: recruiterProfile.id },
        orderBy: { createdAt: 'desc' },
        include: {
          _count: { select: { applications: true } }
        }
      });

      res.status(200).json({ status: 'success', data: jobs });
    } catch (error) {
      next(error);
    }
  }
}

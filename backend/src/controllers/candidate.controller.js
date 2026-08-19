import { prisma } from '../utils/prisma';
import { AppError } from '../utils/AppError';
import { evaluateCandidateMatch } from '../utils/ai';
import { resumeQueue } from '../utils/queue';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
export class CandidateController {
    static async uploadResume(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId)
                throw new AppError('Unauthorized', 401);
            let rawText = '';
            if (req.file) {
                // Handle PDF upload
                if (req.file.mimetype === 'application/pdf') {
                    const pdfData = await pdfParse(req.file.buffer);
                    rawText = pdfData.text;
                }
                else {
                    // If they upload a txt file or similar (fallback)
                    rawText = req.file.buffer.toString('utf-8');
                }
            }
            else if (req.body.resumeText) {
                // Fallback to text if frontend sends text instead of file
                rawText = req.body.resumeText;
            }
            if (!rawText || rawText.trim().length === 0) {
                throw new AppError('Resume file or text is required', 400);
            }
            // Instead of waiting, push to queue
            const job = await resumeQueue.add('parse-resume', {
                rawText,
                userId,
                originalName: req.file ? req.file.originalname : 'Uploaded_Resume.txt'
            });
            res.status(202).json({
                status: 'success',
                data: {
                    jobId: job.id,
                    message: 'Resume queued for processing'
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getResumeStatus(req, res, next) {
        try {
            const jobId = req.params.jobId;
            const job = await resumeQueue.getJob(jobId);
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
        }
        catch (error) {
            next(error);
        }
    }
    static async getJobs(req, res, next) {
        try {
            const jobs = await prisma.job.findMany({
                where: { status: 'OPEN' },
                include: { recruiter: true },
                orderBy: { createdAt: 'desc' }
            });
            res.status(200).json({ status: 'success', data: jobs });
        }
        catch (error) {
            next(error);
        }
    }
    static async applyToJob(req, res, next) {
        try {
            const { jobId } = req.body;
            const userId = req.user?.userId;
            if (!jobId || !userId) {
                throw new AppError('jobId and userId are required', 400);
            }
            const candidateProfile = await prisma.candidateProfile.findUnique({
                where: { userId },
                include: { resumes: { orderBy: { createdAt: 'desc' }, take: 1 } }
            });
            if (!candidateProfile || candidateProfile.resumes.length === 0) {
                throw new AppError('Candidate profile or resume not found. Please upload a resume first.', 400);
            }
            const resume = candidateProfile.resumes[0];
            if (!resume)
                throw new AppError('Resume not found', 400);
            const job = await prisma.job.findUnique({ where: { id: jobId } });
            if (!job) {
                throw new AppError('Job not found', 404);
            }
            // Check if already applied
            const existingApplication = await prisma.application.findFirst({
                where: { candidateId: candidateProfile.id, jobId }
            });
            if (existingApplication) {
                throw new AppError('You have already applied to this job.', 400);
            }
            // Evaluate match with AI
            const matchData = await evaluateCandidateMatch(resume.parsedData, job.description);
            // Compute semantic similarity using pgvector
            const resultVector = await prisma.$queryRaw `
        SELECT 1 - ("Resume"."embedding" <=> "Job"."embedding") AS similarity
        FROM "Resume", "Job"
        WHERE "Resume".id = ${resume.id}::uuid AND "Job".id = ${job.id}::uuid
      `;
            let semanticScore = 0;
            if (resultVector && resultVector[0] && resultVector[0].similarity != null) {
                // cosine similarity is -1 to 1. Normalize to 0-100.
                const sim = resultVector[0].similarity;
                semanticScore = Math.round(((sim + 1) / 2) * 100);
            }
            // Save Application and Evaluation in a transaction
            const result = await prisma.$transaction(async (tx) => {
                const application = await tx.application.create({
                    data: {
                        candidateId: candidateProfile.id,
                        jobId: job.id,
                        resumeId: resume.id,
                        status: 'AI_REVIEW'
                    }
                });
                const evaluation = await tx.candidateEvaluation.create({
                    data: {
                        candidateId: candidateProfile.id,
                        jobId: job.id,
                        applicationId: application.id,
                        overallScore: matchData.overallScore || matchData.skillScore,
                        semanticScore: semanticScore,
                        skillScore: matchData.skillScore,
                        experienceScore: matchData.experienceScore,
                        matchedSkills: matchData.matchedSkills || [],
                        missingSkills: matchData.missingSkills || [],
                        summary: matchData.summary
                    }
                });
                return { application, evaluation };
            });
            res.status(201).json({ status: 'success', data: result });
        }
        catch (error) {
            next(error);
        }
    }
    static async getApplications(req, res, next) {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                throw new AppError('Unauthorized', 401);
            }
            const candidateProfile = await prisma.candidateProfile.findUnique({
                where: { userId }
            });
            if (!candidateProfile) {
                return res.status(200).json({ status: 'success', data: [] });
            }
            const applications = await prisma.application.findMany({
                where: { candidateId: candidateProfile.id },
                include: {
                    job: {
                        include: { recruiter: { include: { user: { select: { name: true } } } } }
                    },
                    evaluation: true
                },
                orderBy: { appliedAt: 'desc' }
            });
            res.status(200).json({ status: 'success', data: applications });
        }
        catch (error) {
            next(error);
        }
    }
}
//# sourceMappingURL=candidate.controller.js.map
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '../../src/utils/prisma';
import { CandidateController } from '../../src/controllers/candidate.controller';
import { evaluateCandidateMatch } from '../../src/utils/ai';

// We need to mock the req, res, next objects for controllers
const mockReq = () => {
  const req: any = {};
  req.body = vi.fn().mockReturnValue(req)();
  req.params = vi.fn().mockReturnValue(req)();
  req.user = vi.fn().mockReturnValue(req)();
  return req;
};

const mockRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockNext = () => vi.fn();

// Mock prisma and BullMQ queue
vi.mock('../../src/utils/prisma', () => ({
  prisma: {
    job: { findUnique: vi.fn() },
    candidateProfile: { findUnique: vi.fn() },
    application: { findFirst: vi.fn(), create: vi.fn() },
    applicationStatusHistory: { create: vi.fn() },
    resume: { findFirst: vi.fn() },
    candidateEvaluation: { create: vi.fn() },
    $queryRaw: vi.fn(),
    $transaction: vi.fn(async (cb) => {
      // Just pass a dummy tx object with the mocked methods
      return cb({
        application: { create: vi.fn().mockResolvedValue({ id: 'app-1' }) },
        candidateEvaluation: { create: vi.fn().mockResolvedValue({ id: 'eval-1' }) }
      });
    }),
  }
}));

vi.mock('../../src/utils/queue', () => ({
  resumeQueue: { add: vi.fn() },
  jobDescriptionQueue: { add: vi.fn() }
}));

vi.mock('../../src/utils/ai', () => ({
  evaluateCandidateMatch: vi.fn()
}));

describe('Matching Logic & Application Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('applyToJob', () => {
    it('should successfully apply and compute semantic score using pgvector mock', async () => {
      const req = mockReq();
      req.body = { jobId: 'job-1' };
      req.user = { userId: 'user-1' };
      const res = mockRes();

      // Setup prisma mocks for a valid application
      (prisma.job.findUnique as any).mockResolvedValue({ id: 'job-1', recruiterId: 'rec-1', status: 'OPEN' });
      (prisma.candidateProfile.findUnique as any).mockResolvedValue({ id: 'cand-1', resumes: [{ id: 'res-1' }] });
      (prisma.application.findFirst as any).mockResolvedValue(null); // Not applied yet
      (prisma.resume.findFirst as any).mockResolvedValue({ id: 'res-1' });
      
      // Mock the AI evaluation result
      (evaluateCandidateMatch as any).mockResolvedValue({
        overallScore: 90,
        skillScore: 90,
        experienceScore: 90,
        matchedSkills: [],
        missingSkills: [],
        summary: 'Good'
      });
      
      // Mock the pgvector $queryRaw result
      (prisma.$queryRaw as any).mockResolvedValue([{ similarity: 0.85 }]); // 85% match

      (prisma.application.create as any).mockResolvedValue({ id: 'app-1' });

      const next = mockNext();
      await CandidateController.applyToJob(req, res, next);

      // the transaction mock in setup returns a dummy tx object.
      // But we can check if it was called by inspecting the mock we injected.
      // Wait, we can't easily inspect the mock returned by the $transaction inline mock.
      // Let's just expect res.status to be 201 which implies it succeeded.
      expect(prisma.$queryRaw).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it('should reject application if candidate has no resume', async () => {
      const req = mockReq();
      req.body = { jobId: 'job-1' };
      req.user = { userId: 'user-1' };
      const res = mockRes();

      (prisma.job.findUnique as any).mockResolvedValue({ id: 'job-1', status: 'OPEN' });
      (prisma.candidateProfile.findUnique as any).mockResolvedValue({ id: 'cand-1', resumes: [] });
      (prisma.resume.findFirst as any).mockResolvedValue(null); // No resume

      const next = mockNext();
      await CandidateController.applyToJob(req, res, next);
      
      expect(next).toHaveBeenCalled(); // Since AppError is thrown, next(error) is called
    });
  });
});

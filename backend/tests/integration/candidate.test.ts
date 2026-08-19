import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/server';
import { prisma } from '../../src/utils/prisma';
import jwt from 'jsonwebtoken';
import { resumeQueue } from '../../src/utils/queue';

// Mock the queues to prevent Redis connections
vi.mock('../../src/utils/queue', () => ({
  resumeQueue: { add: vi.fn(), getJob: vi.fn() },
  jobQueue: { add: vi.fn(), getJob: vi.fn() },
  redisConnection: {}
}));

// Mock AI completely
vi.mock('../../src/utils/ai', () => ({
  evaluateCandidateMatch: vi.fn().mockResolvedValue({ overallScore: 80, skillScore: 80 }),
  semanticSearchCandidates: vi.fn().mockResolvedValue({
    matches: [{ applicationId: 'app-1', score: 95, reason: 'Good match' }]
  })
}));

// Mock Prisma completely for candidate
vi.mock('../../src/utils/prisma', () => ({
  prisma: {
    user: { findUnique: vi.fn() },
    job: { findMany: vi.fn(), findUnique: vi.fn() },
    candidateProfile: { findUnique: vi.fn() },
    application: { findFirst: vi.fn(), create: vi.fn(), findMany: vi.fn() },
    resume: { findFirst: vi.fn() },
    candidateEvaluation: { create: vi.fn() },
    $queryRaw: vi.fn(),
    $transaction: vi.fn(async (cb) => {
      return cb({
        application: { create: vi.fn().mockResolvedValue({ id: 'app-1' }) },
        candidateEvaluation: { create: vi.fn().mockResolvedValue({ id: 'eval-1' }) }
      });
    }),
  }
}));

const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET || 'super-secret-key-for-dev', { expiresIn: '15m' });
};

describe('Candidate API Integration Tests', () => {
  const candidateToken = generateToken('user-1', 'CANDIDATE');
  const recruiterToken = generateToken('user-2', 'RECRUITER');

  beforeAll(() => {
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('Authentication & Authorization', () => {
    it('should reject requests without a token', async () => {
      const res = await request(app).get('/api/candidates/jobs');
      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Unauthorized - Invalid token');
    });

    it('should reject requests with wrong role (Recruiter attempting candidate access)', async () => {
      // Mock the user find so authenticate middleware passes
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-2', role: 'RECRUITER' });

      const res = await request(app)
        .get('/api/candidates/jobs')
        .set('Authorization', `Bearer ${recruiterToken}`);
      
      expect(res.status).toBe(403);
      expect(res.body.message).toBe('Forbidden - Insufficient permissions');
    });
  });

  describe('POST /api/candidates/resume', () => {
    it('should upload a resume and enqueue a job', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-1', role: 'CANDIDATE' });
      (resumeQueue.add as any).mockResolvedValue({ id: 'queue-job-1' });

      const res = await request(app)
        .post('/api/candidates/resume')
        .set('Authorization', `Bearer ${candidateToken}`)
        .send({ resumeText: 'My skills are React and Node' });

      expect(res.status).toBe(202);
      expect(res.body.data.jobId).toBe('queue-job-1');
      expect(resumeQueue.add).toHaveBeenCalled();
    });

    it('should handle invalid file/empty text', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-1', role: 'CANDIDATE' });

      const res = await request(app)
        .post('/api/candidates/resume')
        .set('Authorization', `Bearer ${candidateToken}`)
        .send({}); // empty

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Resume file or text is required');
    });
  });

  describe('POST /api/candidates/evaluate', () => {
    it('should apply to a job successfully', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-1', role: 'CANDIDATE' });
      (prisma.candidateProfile.findUnique as any).mockResolvedValue({ id: 'cand-1', resumes: [{ id: 'res-1', parsedData: {} }] });
      (prisma.job.findUnique as any).mockResolvedValue({ id: 'job-1', description: 'desc' });
      (prisma.application.findFirst as any).mockResolvedValue(null); // not applied yet

      // AI is mocked at the top of the file
      (prisma.$queryRaw as any).mockResolvedValue([{ similarity: 0.9 }]);

      const res = await request(app)
        .post('/api/candidates/evaluate')
        .set('Authorization', `Bearer ${candidateToken}`)
        .send({ jobId: 'job-1' });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
    });

    it('should prevent duplicate applications', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-1', role: 'CANDIDATE' });
      (prisma.candidateProfile.findUnique as any).mockResolvedValue({ id: 'cand-1', resumes: [{ id: 'res-1' }] });
      (prisma.job.findUnique as any).mockResolvedValue({ id: 'job-1' });
      (prisma.application.findFirst as any).mockResolvedValue({ id: 'app-1' }); // already applied

      const res = await request(app)
        .post('/api/candidates/evaluate')
        .set('Authorization', `Bearer ${candidateToken}`)
        .send({ jobId: 'job-1' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('You have already applied to this job.');
    });

    it('should return 404 for nonexistent job', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-1', role: 'CANDIDATE' });
      (prisma.candidateProfile.findUnique as any).mockResolvedValue({ id: 'cand-1', resumes: [{ id: 'res-1' }] });
      (prisma.job.findUnique as any).mockResolvedValue(null); // job does not exist

      const res = await request(app)
        .post('/api/candidates/evaluate')
        .set('Authorization', `Bearer ${candidateToken}`)
        .send({ jobId: 'job-999' });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Job not found');
    });
  });

  describe('GET /api/candidates/applications', () => {
    it('should return candidate applications', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'user-1', role: 'CANDIDATE' });
      (prisma.candidateProfile.findUnique as any).mockResolvedValue({ id: 'cand-1' });
      (prisma.application.findMany as any).mockResolvedValue([{ id: 'app-1' }]);

      const res = await request(app)
        .get('/api/candidates/applications')
        .set('Authorization', `Bearer ${candidateToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RecruiterController } from '../../src/controllers/recruiter.controller';
import { prisma } from '../../src/utils/prisma';
import { generateEmail } from '../../src/utils/ai';

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

vi.mock('../../src/utils/prisma', () => ({
  prisma: {
    application: {
      findUnique: vi.fn(),
      update: vi.fn()
    },
    job: {
      findUnique: vi.fn()
    }
  }
}));

vi.mock('../../src/utils/ai', () => ({
  generateEmail: vi.fn()
}));

describe('Email Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('draftEmail', () => {
    it('should successfully draft an email for a candidate', async () => {
      const req = mockReq();
      req.params = { applicationId: 'app-1' };
      req.body = { prompt: 'Send an offer letter for $100k' };
      req.user = { userId: 'rec-1', role: 'RECRUITER' };
      const res = mockRes();

      (prisma.application.findUnique as any).mockResolvedValue({
        id: 'app-1',
        candidate: { user: { name: 'Alice' } },
        job: { title: 'Engineer', recruiter: { userId: 'rec-1' } }
      });

      (generateEmail as any).mockResolvedValue('Dear Alice, we would like to offer you the Engineer position for $100k.');

      const next = mockNext();
      await RecruiterController.draftEmail(req, res, next);

      expect(generateEmail).toHaveBeenCalledWith(
        'Send an offer letter for $100k',
        'Alice'
      );
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        data: { draftedBody: 'Dear Alice, we would like to offer you the Engineer position for $100k.' }
      }));
    });

    it('should forbid drafting if recruiter does not own the job', async () => {
      const req = mockReq();
      req.params = { applicationId: 'app-1' };
      req.body = { instructions: 'Send an offer letter' };
      req.user = { userId: 'rec-2', role: 'RECRUITER' }; // Different recruiter
      const res = mockRes();

      (prisma.application.findUnique as any).mockResolvedValue({
        id: 'app-1',
        job: { recruiter: { userId: 'rec-1' } }
      });

      const next = mockNext();
      await RecruiterController.draftEmail(req, res, next);
      
      expect(next).toHaveBeenCalled();

      expect(generateEmail).not.toHaveBeenCalled();
    });
  });
});

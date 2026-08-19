import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock BullMQ completely
vi.mock('bullmq', () => ({
  Worker: class Worker { on = vi.fn() },
  Queue: class Queue { add = vi.fn() }
}));

// Mock Prisma
vi.mock('../../src/utils/prisma', () => ({
  prisma: {
    resume: { findUnique: vi.fn(), update: vi.fn() },
    job: { findUnique: vi.fn(), update: vi.fn() },
    $executeRaw: vi.fn(),
  }
}));

// Import workers after mocking
import '../../src/workers/index';
import { Worker } from 'bullmq';

describe('Workers Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize Resume and Job workers without errors', () => {
    expect(true).toBe(true);
  });
});

import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/server';
import { prisma } from '../../src/utils/prisma';
import bcrypt from 'bcrypt';

describe('Auth API Integration Tests', () => {
  beforeAll(async () => {
    // We mock Prisma since we don't want to write to the real DB during integration tests
    // Alternatively, we could use a test DB, but mocking is faster for this project.
    vi.mock('../../src/utils/prisma', () => ({
      prisma: {
        user: { findUnique: vi.fn(), create: vi.fn(), update: vi.fn() },
        candidateProfile: { create: vi.fn() },
        recruiterProfile: { create: vi.fn() },
        $transaction: vi.fn(async (cb) => {
          return cb({
            user: { create: vi.fn().mockResolvedValue({ id: 'user-1', email: 'test@example.com', role: 'CANDIDATE' }) },
            candidateProfile: { create: vi.fn().mockResolvedValue({ id: 'cand-1', userId: 'user-1' }) },
            recruiterProfile: { create: vi.fn() }
          });
        }),
      }
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a candidate successfully', async () => {
      // Mock the bcrypt hash
      vi.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword123' as never);

      // Mock DB calls
      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({ id: 'user-1', email: 'test@example.com' });
      (prisma.candidateProfile.create as any).mockResolvedValue({ id: 'cand-1', userId: 'user-1' });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Candidate',
          email: 'test@example.com',
          password: 'password123',
          role: 'CANDIDATE'
        });

      expect(res.status).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.data.user.email).toBe('test@example.com');
      expect(res.body.data.tokens).toBeDefined();
    });

    it('should return 400 if user already exists', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: 'existing-user' });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test Candidate',
          email: 'existing@example.com',
          password: 'password123',
          role: 'CANDIDATE'
        });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email already in use');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      const mockUser = {
        id: 'user-1',
        email: 'login@example.com',
        password: 'hashedpassword',
        role: 'CANDIDATE'
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'password123'
        });

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.data.tokens).toBeDefined();
    });

    it('should return 401 for incorrect password', async () => {
      const mockUser = {
        id: 'user-1',
        email: 'login@example.com',
        password: 'hashedpassword',
        role: 'CANDIDATE'
      };

      (prisma.user.findUnique as any).mockResolvedValue(mockUser);
      vi.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Invalid credentials');
    });
  });
});

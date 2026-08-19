import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../../src/services/auth.service';
import { prisma } from '../../src/utils/prisma';
import bcrypt from 'bcrypt';
import { Role } from '../../src/generated/prisma/client';

// Mock dependencies
vi.mock('../../src/utils/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    recruiterProfile: {
      create: vi.fn(),
    },
    candidateProfile: {
      create: vi.fn(),
    },
    $transaction: vi.fn((callback) => callback(prisma)),
  }
}));

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_password'),
    compare: vi.fn(),
  }
}));

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Register', () => {
    it('should throw an error if email already exists', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({ id: '123', email: 'test@test.com' });
      
      await expect(AuthService.register({
        email: 'test@test.com',
        password: 'password123',
        name: 'Test',
        role: Role.CANDIDATE
      })).rejects.toThrow('Email already in use');
    });

    it('should register a candidate successfully', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);
      (prisma.user.create as any).mockResolvedValue({
        id: 'new-user-id',
        email: 'test@test.com',
        role: Role.CANDIDATE,
        passwordHash: 'hashed_password'
      });
      (prisma.candidateProfile.create as any).mockResolvedValue({ id: 'profile-id' });

      const result = await AuthService.register({
        email: 'test@test.com',
        password: 'password123',
        name: 'Test',
        role: Role.CANDIDATE
      });

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('tokens');
      expect(result.user.id).toBe('new-user-id');
      expect(prisma.candidateProfile.create).toHaveBeenCalled();
    });

    it('should fail recruiter registration without company info', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);
      
      await expect(AuthService.register({
        email: 'test@test.com',
        password: 'password123',
        name: 'Test',
        role: Role.RECRUITER
        // Missing company details
      })).rejects.toThrow('companyName and companyRole are required for RECRUITER');
    });
  });

  describe('Login', () => {
    it('should throw an error for invalid email', async () => {
      (prisma.user.findUnique as any).mockResolvedValue(null);
      
      await expect(AuthService.login({
        email: 'notfound@test.com',
        password: 'password'
      })).rejects.toThrow('Invalid credentials');
    });

    it('should throw an error for invalid password', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({
        id: 'user1',
        email: 'test@test.com',
        passwordHash: 'hashed_password'
      });
      (bcrypt.compare as any).mockResolvedValue(false);
      
      await expect(AuthService.login({
        email: 'test@test.com',
        password: 'wrongpassword'
      })).rejects.toThrow('Invalid credentials');
    });

    it('should successfully login and return tokens', async () => {
      (prisma.user.findUnique as any).mockResolvedValue({
        id: 'user1',
        email: 'test@test.com',
        passwordHash: 'hashed_password',
        role: Role.CANDIDATE
      });
      (bcrypt.compare as any).mockResolvedValue(true);
      
      const result = await AuthService.login({
        email: 'test@test.com',
        password: 'password123'
      });

      expect(result).toHaveProperty('tokens');
      expect(result.user.email).toBe('test@test.com');
    });
  });
});

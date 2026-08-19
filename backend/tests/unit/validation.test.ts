import { describe, it, expect, vi } from 'vitest';
import { z } from 'zod';

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['RECRUITER', 'CANDIDATE']),
    companyName: z.string().optional(),
    companyRole: z.string().optional(),
  }).refine((data) => {
    if (data.role === 'RECRUITER') {
      return !!data.companyName && !!data.companyRole;
    }
    return true;
  }, {
    message: "companyName and companyRole are required for RECRUITER role",
    path: ["companyName"],
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  })
});

describe('Validation Schemas', () => {
  describe('Register Schema', () => {
    it('should validate a correct CANDIDATE registration', () => {
      const validData = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
          role: 'CANDIDATE',
        }
      };
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate a correct RECRUITER registration', () => {
      const validData = {
        body: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'password123',
          role: 'RECRUITER',
          companyName: 'TechCorp',
          companyRole: 'Senior Recruiter'
        }
      };
      const result = registerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail RECRUITER registration if companyName is missing', () => {
      const invalidData = {
        body: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          password: 'password123',
          role: 'RECRUITER',
          companyRole: 'Senior Recruiter'
        }
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('companyName and companyRole are required for RECRUITER role');
      }
    });

    it('should fail if email is invalid', () => {
      const invalidData = {
        body: {
          name: 'John Doe',
          email: 'not-an-email',
          password: 'password123',
          role: 'CANDIDATE',
        }
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should fail if password is too short', () => {
      const invalidData = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
          password: '123',
          role: 'CANDIDATE',
        }
      };
      const result = registerSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Login Schema', () => {
    it('should validate correct login data', () => {
      const result = loginSchema.safeParse({
        body: { email: 'john@example.com', password: 'password123' }
      });
      expect(result.success).toBe(true);
    });

    it('should fail with invalid email', () => {
      const result = loginSchema.safeParse({
        body: { email: 'invalid', password: 'password123' }
      });
      expect(result.success).toBe(false);
    });
  });
});

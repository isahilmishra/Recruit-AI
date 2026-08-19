import { describe, it, expect } from 'vitest';
import { generateTokens, verifyAccessToken, verifyRefreshToken } from '../../src/utils/jwt';
import { Role } from '../../src/generated/prisma/client';

describe('JWT Utilities', () => {
  it('should generate access and refresh tokens', () => {
    const tokens = generateTokens('user-123', Role.CANDIDATE);
    
    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
    expect(typeof tokens.accessToken).toBe('string');
    expect(typeof tokens.refreshToken).toBe('string');
  });

  it('should successfully verify a valid access token', () => {
    const tokens = generateTokens('user-456', Role.RECRUITER);
    const decoded = verifyAccessToken(tokens.accessToken);
    
    expect(decoded.userId).toBe('user-456');
    expect(decoded.role).toBe(Role.RECRUITER);
  });

  it('should successfully verify a valid refresh token', () => {
    const tokens = generateTokens('user-789', Role.ADMIN);
    const decoded = verifyRefreshToken(tokens.refreshToken);
    
    expect(decoded.userId).toBe('user-789');
    expect(decoded.role).toBe(Role.ADMIN);
  });

  it('should throw an error for an invalid access token', () => {
    expect(() => verifyAccessToken('invalid.token.here')).toThrow();
  });

  it('should throw an error for an invalid refresh token', () => {
    expect(() => verifyRefreshToken('invalid.token.here')).toThrow();
  });
});

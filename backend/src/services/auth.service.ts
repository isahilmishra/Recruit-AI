import bcrypt from 'bcrypt';
import { prisma } from '../utils/prisma';
import { generateTokens, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';
import { Role } from '../generated/prisma/client';

export class AuthService {
  static async register(data: any) {
    const { name, email, password, role, companyName, companyRole, phone, location } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError('Email already in use', 400);
    }

    const passwordHash = await bcrypt.hash(password, 12);

    return await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, passwordHash, role },
      });

      if (role === Role.RECRUITER) {
        if (!companyName || !companyRole) {
          throw new AppError('companyName and companyRole are required for RECRUITER', 400);
        }
        await tx.recruiterProfile.create({
          data: { userId: user.id, companyName, companyRole },
        });
      } else if (role === Role.CANDIDATE) {
        await tx.candidateProfile.create({
          data: { userId: user.id, phone, location },
        });
      }

      const tokens = generateTokens(user.id, user.role);
      
      const { passwordHash: _, ...userWithoutPassword } = user;
      return { user: userWithoutPassword, tokens };
    });
  }

  static async login(data: any) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const tokens = generateTokens(user.id, user.role);
    const { passwordHash: _, ...userWithoutPassword } = user;
    
    return { user: userWithoutPassword, tokens };
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError('Refresh token is required', 401);
    }

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } });

      if (!user) {
        throw new AppError('User no longer exists', 401);
      }

      const tokens = generateTokens(user.id, user.role);
      return { tokens };
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }
}

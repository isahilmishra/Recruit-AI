import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const getHealth = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
};

export const dbHealth = async (req: Request, res: Response) => {
  try {
    const url = process.env.DATABASE_URL || 'UNDEFINED';
    const maskedUrl = url.replace(/:([^:@]+)@/, ":***@");
    
    res.status(200).json({
      status: 'ok',
      database_url: maskedUrl,
    });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
};

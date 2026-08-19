import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny, ZodError } from 'zod';
import { AppError } from '../utils/AppError';

export const validate = (schema: ZodTypeAny) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((e) => `${String(e.path[e.path.length - 1])}: ${e.message}`).join(', ');
        return res.status(400).json({
          status: 'fail',
          message: `Validation failed: ${errorMessages}`,
          errors: error.issues,
        });
      }
      next(error);
    }
  };
};

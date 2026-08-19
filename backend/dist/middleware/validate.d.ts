import { Request, Response, NextFunction } from 'express';
import { ZodTypeAny } from 'zod';
export declare const validate: (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=validate.d.ts.map
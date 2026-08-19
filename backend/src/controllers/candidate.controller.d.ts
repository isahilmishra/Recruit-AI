import { Request, Response, NextFunction } from 'express';
export declare class CandidateController {
    static uploadResume(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getResumeStatus(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static getJobs(req: Request, res: Response, next: NextFunction): Promise<void>;
    static applyToJob(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getApplications(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=candidate.controller.d.ts.map
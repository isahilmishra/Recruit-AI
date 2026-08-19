import { Request, Response, NextFunction } from 'express';
export declare class RecruiterController {
    static createJob(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getJobCreationStatus(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static getJobCandidates(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getJobs(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static getAllApplications(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static updateApplicationStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
    static draftEmail(req: Request, res: Response, next: NextFunction): Promise<void>;
    static sendEmail(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static searchCandidates(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static scheduleInterview(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getInterviews(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=recruiter.controller.d.ts.map
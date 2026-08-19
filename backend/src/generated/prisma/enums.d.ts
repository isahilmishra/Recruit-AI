export declare const Role: {
    readonly RECRUITER: 'RECRUITER';
    readonly CANDIDATE: 'CANDIDATE';
    readonly ADMIN: 'ADMIN';
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const ApplicationStatus: {
    readonly APPLIED: 'APPLIED';
    readonly AI_REVIEW: 'AI_REVIEW';
    readonly RECRUITER_REVIEW: 'RECRUITER_REVIEW';
    readonly SHORTLISTED: 'SHORTLISTED';
    readonly INTERVIEW: 'INTERVIEW';
    readonly OFFER: 'OFFER';
    readonly HIRED: 'HIRED';
    readonly REJECTED: 'REJECTED';
};
export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus];
export declare const ProcessingStatus: {
    readonly PENDING: 'PENDING';
    readonly PROCESSING: 'PROCESSING';
    readonly COMPLETED: 'COMPLETED';
    readonly FAILED: 'FAILED';
};
export type ProcessingStatus = (typeof ProcessingStatus)[keyof typeof ProcessingStatus];
export declare const InterviewStatus: {
    readonly SCHEDULED: 'SCHEDULED';
    readonly COMPLETED: 'COMPLETED';
    readonly CANCELED: 'CANCELED';
};
export type InterviewStatus = (typeof InterviewStatus)[keyof typeof InterviewStatus];
//# sourceMappingURL=enums.d.ts.map
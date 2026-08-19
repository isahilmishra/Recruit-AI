import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: 'User';
    readonly RecruiterProfile: 'RecruiterProfile';
    readonly CandidateProfile: 'CandidateProfile';
    readonly Resume: 'Resume';
    readonly Job: 'Job';
    readonly Application: 'Application';
    readonly CandidateEvaluation: 'CandidateEvaluation';
    readonly ApplicationStatusHistory: 'ApplicationStatusHistory';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: 'id';
    readonly name: 'name';
    readonly email: 'email';
    readonly passwordHash: 'passwordHash';
    readonly role: 'role';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RecruiterProfileScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly companyName: 'companyName';
    readonly companyRole: 'companyRole';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type RecruiterProfileScalarFieldEnum = (typeof RecruiterProfileScalarFieldEnum)[keyof typeof RecruiterProfileScalarFieldEnum];
export declare const CandidateProfileScalarFieldEnum: {
    readonly id: 'id';
    readonly userId: 'userId';
    readonly phone: 'phone';
    readonly location: 'location';
    readonly education: 'education';
    readonly skills: 'skills';
    readonly experience: 'experience';
    readonly projects: 'projects';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CandidateProfileScalarFieldEnum = (typeof CandidateProfileScalarFieldEnum)[keyof typeof CandidateProfileScalarFieldEnum];
export declare const ResumeScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateId: 'candidateId';
    readonly fileName: 'fileName';
    readonly fileUrl: 'fileUrl';
    readonly extractedText: 'extractedText';
    readonly parsedData: 'parsedData';
    readonly processingStatus: 'processingStatus';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum];
export declare const JobScalarFieldEnum: {
    readonly id: 'id';
    readonly recruiterId: 'recruiterId';
    readonly title: 'title';
    readonly company: 'company';
    readonly location: 'location';
    readonly description: 'description';
    readonly requirements: 'requirements';
    readonly preferredSkills: 'preferredSkills';
    readonly experienceLevel: 'experienceLevel';
    readonly source: 'source';
    readonly sourceJobId: 'sourceJobId';
    readonly applicationUrl: 'applicationUrl';
    readonly status: 'status';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum];
export declare const ApplicationScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateId: 'candidateId';
    readonly jobId: 'jobId';
    readonly resumeId: 'resumeId';
    readonly status: 'status';
    readonly appliedAt: 'appliedAt';
    readonly updatedAt: 'updatedAt';
};
export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum];
export declare const CandidateEvaluationScalarFieldEnum: {
    readonly id: 'id';
    readonly candidateId: 'candidateId';
    readonly jobId: 'jobId';
    readonly applicationId: 'applicationId';
    readonly overallScore: 'overallScore';
    readonly semanticScore: 'semanticScore';
    readonly skillScore: 'skillScore';
    readonly experienceScore: 'experienceScore';
    readonly matchedSkills: 'matchedSkills';
    readonly missingSkills: 'missingSkills';
    readonly summary: 'summary';
    readonly createdAt: 'createdAt';
    readonly updatedAt: 'updatedAt';
};
export type CandidateEvaluationScalarFieldEnum = (typeof CandidateEvaluationScalarFieldEnum)[keyof typeof CandidateEvaluationScalarFieldEnum];
export declare const ApplicationStatusHistoryScalarFieldEnum: {
    readonly id: 'id';
    readonly applicationId: 'applicationId';
    readonly oldStatus: 'oldStatus';
    readonly newStatus: 'newStatus';
    readonly changedBy: 'changedBy';
    readonly createdAt: 'createdAt';
};
export type ApplicationStatusHistoryScalarFieldEnum = (typeof ApplicationStatusHistoryScalarFieldEnum)[keyof typeof ApplicationStatusHistoryScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map
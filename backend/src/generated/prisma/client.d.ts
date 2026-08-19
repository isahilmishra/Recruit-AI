import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model RecruiterProfile
 *
 */
export type RecruiterProfile = Prisma.RecruiterProfileModel;
/**
 * Model CandidateProfile
 *
 */
export type CandidateProfile = Prisma.CandidateProfileModel;
/**
 * Model Resume
 *
 */
export type Resume = Prisma.ResumeModel;
/**
 * Model Job
 *
 */
export type Job = Prisma.JobModel;
/**
 * Model Application
 *
 */
export type Application = Prisma.ApplicationModel;
/**
 * Model CandidateEvaluation
 *
 */
export type CandidateEvaluation = Prisma.CandidateEvaluationModel;
/**
 * Model ApplicationStatusHistory
 *
 */
export type ApplicationStatusHistory = Prisma.ApplicationStatusHistoryModel;
//# sourceMappingURL=client.d.ts.map
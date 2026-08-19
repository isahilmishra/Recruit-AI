import { z } from 'zod';
declare const router: import("express-serve-static-core").Router;
export declare const registerSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodEnum<{
            CANDIDATE: "CANDIDATE";
            RECRUITER: "RECRUITER";
        }>;
        companyName: z.ZodOptional<z.ZodString>;
        companyRole: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const refreshSchema: z.ZodObject<{
    body: z.ZodObject<{
        refreshToken: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export default router;
//# sourceMappingURL=auth.routes.d.ts.map
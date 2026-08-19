import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { z } from 'zod';
const router = Router();
export const registerSchema = z.object({
    body: z.object({
        name: z.string().min(2),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['RECRUITER', 'CANDIDATE']),
        companyName: z.string().optional(),
        companyRole: z.string().optional(),
        phone: z.string().optional(),
        location: z.string().optional(),
    }).refine((data) => {
        if (data.role === 'RECRUITER') {
            return !!data.companyName && !!data.companyRole;
        }
        return true;
    }, {
        message: "companyName and companyRole are required for RECRUITER role",
        path: ["companyName"],
    })
});
export const loginSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string(),
    })
});
export const refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string(),
    })
});
router.post('/register', validate(registerSchema), AuthController.register);
router.post('/login', validate(loginSchema), AuthController.login);
router.post('/refresh', validate(refreshSchema), AuthController.refresh);
router.post('/logout', AuthController.logout);
export default router;
//# sourceMappingURL=auth.routes.js.map
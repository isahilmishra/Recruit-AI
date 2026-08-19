import { Role } from '../generated/prisma/client';
export declare class AuthService {
    static register(data: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: Role;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    static login(data: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: Role;
            createdAt: Date;
            updatedAt: Date;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    static refresh(refreshToken: string): Promise<{
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map
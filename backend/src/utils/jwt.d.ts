import { Role } from '../generated/prisma/client';
export interface TokenPayload {
    userId: string;
    role: Role;
}
export declare const generateTokens: (userId: string, role: Role) => {
    accessToken: string;
    refreshToken: string;
};
export declare const verifyAccessToken: (token: string) => TokenPayload;
export declare const verifyRefreshToken: (token: string) => TokenPayload;
//# sourceMappingURL=jwt.d.ts.map
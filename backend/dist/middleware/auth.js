import { AppError } from '../utils/AppError';
import { verifyAccessToken } from '../utils/jwt';
export const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('Unauthorized - No token provided', 401);
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new AppError('Unauthorized - Malformed token', 401);
        }
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(new AppError('Unauthorized - Invalid token', 401));
    }
};
export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new AppError('Forbidden - Insufficient permissions', 403));
        }
        next();
    };
};
//# sourceMappingURL=auth.js.map
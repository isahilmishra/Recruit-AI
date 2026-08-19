import { AppError } from '../utils/AppError';
export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let status = 'error';
    let message = err.message || 'Internal server error';
    if (!(err instanceof AppError) || err.statusCode === 500) {
        console.error('🔥 ERROR: ', err);
    }
    if (err instanceof AppError) {
        statusCode = err.statusCode;
        status = err.status;
    }
    res.status(statusCode).json({
        status,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
//# sourceMappingURL=errorHandler.js.map
import { ZodError } from 'zod';
export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.issues.map((e) => `${String(e.path[e.path.length - 1])}: ${e.message}`).join(', ');
                return res.status(400).json({
                    status: 'fail',
                    message: `Validation failed: ${errorMessages}`,
                    errors: error.issues,
                });
            }
            next(error);
        }
    };
};
//# sourceMappingURL=validate.js.map
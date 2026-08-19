import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import healthRoutes from './routes/health.routes';
import authRoutes from './routes/auth.routes';
import aiRoutes from './routes/ai.routes';
import candidateRoutes from './routes/candidate.routes';
import recruiterRoutes from './routes/recruiter.routes';
import { errorHandler } from './middleware/errorHandler';
import './workers'; // Initialize BullMQ workers
const app = express();
const port = process.env.PORT || 5000;
// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/recruiters', recruiterRoutes);
// Error Handling
app.use(errorHandler);
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
}
export default app;
//# sourceMappingURL=server.js.map
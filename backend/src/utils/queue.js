import { Queue } from 'bullmq';
import Redis from 'ioredis';
// BullMQ requires maxRetriesPerRequest to be null
export const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
});
export const resumeQueue = new Queue('ResumeQueue', { connection: redisConnection });
export const jobQueue = new Queue('JobQueue', { connection: redisConnection });
//# sourceMappingURL=queue.js.map
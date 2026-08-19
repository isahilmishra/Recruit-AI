import { Queue } from 'bullmq';
import Redis from 'ioredis';
export declare const redisConnection: Redis<"legacy">;
export declare const resumeQueue: Queue<any, any, string, any, any, string, import("bullmq").RedisQueueBackend>;
export declare const jobQueue: Queue<any, any, string, any, any, string, import("bullmq").RedisQueueBackend>;
//# sourceMappingURL=queue.d.ts.map
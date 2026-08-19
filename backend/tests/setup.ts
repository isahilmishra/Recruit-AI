import { beforeAll, afterAll } from 'vitest';

// Global setup for tests
beforeAll(() => {
  // Set up mock env vars
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret';
  process.env.JWT_REFRESH_SECRET = 'test-refresh-secret';
});

afterAll(() => {
  // Teardown
});

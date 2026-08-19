import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../src/server';

describe('Sanity Check', () => {
  it('GET /api/health should return 200 OK', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
  });
});

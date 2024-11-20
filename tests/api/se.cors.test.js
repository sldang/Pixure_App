import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './../../server/index'; // Adjust the path if needed

describe('CORS Configuration', () => {
  it('should have CORS enabled with specific origin', async () => {
    const res = await request(app).options('/api/posts');
    expect(res.headers['access-control-allow-origin']).toBe(process.env.FRONTEND_URL);
  });
});

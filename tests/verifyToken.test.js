//server/middleware/verifyToken
// tests/verifyToken.test.js
import { describe, it, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import verifyToken from '../server/middleware/verifyToken.js';

process.env.JWT_SECRET = 'your_secret_key';

describe('verifyToken Middleware', () => {
  const next = vi.fn();
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };

  it('should call next() with a valid token', () => {
    const validToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const req = {
      headers: {
        authorization: `Bearer ${validToken}`,
      },
    };

    verifyToken(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req).toHaveProperty('userId', 1);
  });

  it('should return 403 with an invalid token', () => {
    const invalidToken = 'invalid.token.here';
    const req = {
      headers: {
        authorization: `Bearer ${invalidToken}`,
      },
    };

    verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith('Token is not valid!');
  });

  it('should return 401 if no token is provided', () => {
    const req = {
      headers: {},
    };

    verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith('You are not authenticated!');
  });
});


/*
// tests/verifyToken.test.js
import { describe, test, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../server/middleware/verifyToken.js';

const app = express();
app.use(express.json());

// A simple protected route to test the middleware
app.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Access granted', userId: req.userId });
});

describe('verifyToken Middleware', () => {
  const validToken = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const invalidToken = 'invalid.token.here';

  it('should return 200 and access granted with a valid token', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${validToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Access granted');
    expect(res.body).toHaveProperty('userId', 1);
  });

  it('should return 403 with an invalid token', async () => {
    const res = await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${invalidToken}`);

    expect(res.status).toBe(403);
    expect(res.body).toBe('Token is not valid!');
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).get('/protected');

    expect(res.status).toBe(401);
    expect(res.body).toBe('You are not authenticated!');
  });
});
*/
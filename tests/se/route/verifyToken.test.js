// tests/verifyToken.test.js
const jwt = require('jsonwebtoken');
const verifyToken = require('../../server/middleware/verifyToken');

process.env.JWT_SECRET = 'your_secret_key';

describe('verifyToken Middleware', () => {
  const next = jest.fn();
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
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

// // // import { describe, it, expect, vi } from 'vitest';
// // // import jwt from 'jsonwebtoken';
// // // import verifyToken from '../../../server/middleware/verifyToken';

// // // describe('verifyToken middleware', () => {
// // //   // Mock objects to simulate Express req, res, and next
// // //   const createMockRequest = (authHeader) => ({
// // //     headers: {
// // //       authorization: authHeader
// // //     }
// // //   });

// // //   const createMockResponse = () => {
// // //     const res = {
// // //       status: vi.fn().mockReturnThis(),
// // //       json: vi.fn()
// // //     };
// // //     return res;
// // //   };

// // //   const mockNext = vi.fn();

// // //   // Reset mocks before each test
// // //   beforeEach(() => {
// // //     vi.clearAllMocks();
// // //   });

// // //   it('should call next() when token is valid', () => {
// // //     // Mock JWT verification
// // //     const mockUser = { id: '123' };
// // //     vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
// // //       callback(null, mockUser);
// // //     });

// // //     const req = createMockRequest('Bearer valid.token.here');
// // //     const res = createMockResponse();

// // //     // Set up environment variable
// // //     process.env.JWT_SECRET = 'test-secret';

// // //     // Call middleware
// // //     verifyToken(req, res, mockNext);

// // //     // Assertions
// // //     expect(jwt.verify).toHaveBeenCalledWith(
// // //       'valid.token.here', 
// // //       process.env.JWT_SECRET, 
// // //       expect.any(Function)
// // //     );
// // //     expect(req.userId).toBe('123');
// // //     expect(mockNext).toHaveBeenCalled();
// // //     expect(res.status).not.toHaveBeenCalled();
// // //   });

// // //   it('should return 403 when token is invalid', () => {
// // //     // Mock JWT verification to simulate an error
// // //     vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
// // //       callback(new Error('Invalid token'), null);
// // //     });

// // //     const req = createMockRequest('Bearer invalid.token.here');
// // //     const res = createMockResponse();

// // //     // Set up environment variable
// // //     process.env.JWT_SECRET = 'test-secret';

// // //     // Call middleware
// // //     verifyToken(req, res, mockNext);

// // //     // Assertions
// // //     expect(jwt.verify).toHaveBeenCalled();
// // //     expect(res.status).toHaveBeenCalledWith(403);
// // //     expect(res.json).toHaveBeenCalledWith("Token is not valid!");
// // //     expect(mockNext).not.toHaveBeenCalled();
// // //   });

// // //   it('should return 401 when no authorization header is present', () => {
// // //     const req = createMockRequest(undefined);
// // //     const res = createMockResponse();

// // //     // Call middleware
// // //     verifyToken(req, res, mockNext);

// // //     // Assertions
// // //     expect(res.status).toHaveBeenCalledWith(401);
// // //     expect(res.json).toHaveBeenCalledWith("You are not authenticated!");
// // //     expect(mockNext).not.toHaveBeenCalled();
// // //   });

// // //   it('should return 401 when authorization header is malformed', () => {
// // //     const req = createMockRequest('InvalidHeader');
// // //     const res = createMockResponse();

// // //     // Call middleware
// // //     verifyToken(req, res, mockNext);

// // //     // Assertions
// // //     expect(res.status).toHaveBeenCalledWith(401);
// // //     expect(res.json).toHaveBeenCalledWith("You are not authenticated!");
// // //     expect(mockNext).not.toHaveBeenCalled();
// // //   });
// // // });

// // import { describe, it, expect, vi, beforeEach } from 'vitest';
// // import jwt from 'jsonwebtoken';
// // import verifyToken from '../../../server/middleware/verifyToken';

// // describe('verifyToken middleware', () => {
// //   let mockNext;
// //   let originalJwtSecret;

// //   // Mock objects to simulate Express req, res, and next
// //   const createMockRequest = (authHeader) => ({
// //     headers: {
// //       authorization: authHeader,
// //     },
// //   });

// //   const createMockResponse = () => {
// //     const res = {
// //       status: vi.fn().mockReturnThis(),
// //       json: vi.fn(),
// //     };
// //     return res;
// //   };

// //   beforeEach(() => {
// //     vi.clearAllMocks();
// //     mockNext = vi.fn();
// //     originalJwtSecret = process.env.JWT_SECRET;
// //     process.env.JWT_SECRET = 'test-secret';
// //   });

// //   afterAll(() => {
// //     process.env.JWT_SECRET = originalJwtSecret;
// //   });

// //   it('should call next() when token is valid', () => {
// //     const mockUser = { id: '123' };
// //     vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
// //       callback(null, mockUser);
// //     });

// //     const req = createMockRequest('Bearer valid.token.here');
// //     const res = createMockResponse();

// //     verifyToken(req, res, mockNext);

// //     expect(jwt.verify).toHaveBeenCalledWith(
// //       'valid.token.here',
// //       process.env.JWT_SECRET,
// //       expect.any(Function)
// //     );
// //     expect(req.userId).toBe('123');
// //     expect(mockNext).toHaveBeenCalled();
// //     expect(res.status).not.toHaveBeenCalled();
// //   });

// //   it('should return 403 when token is invalid', () => {
// //     vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
// //       callback(new Error('Invalid token'), null);
// //     });

// //     const req = createMockRequest('Bearer invalid.token.here');
// //     const res = createMockResponse();

// //     verifyToken(req, res, mockNext);

// //     expect(jwt.verify).toHaveBeenCalledWith(
// //       'invalid.token.here',
// //       process.env.JWT_SECRET,
// //       expect.any(Function)
// //     );
// //     expect(res.status).toHaveBeenCalledWith(403);
// //     expect(res.json).toHaveBeenCalledWith('Token is not valid!');
// //     expect(mockNext).not.toHaveBeenCalled();
// //   });

// //   it('should return 401 when no authorization header is present', () => {
// //     const req = createMockRequest(undefined);
// //     const res = createMockResponse();

// //     verifyToken(req, res, mockNext);

// //     expect(res.status).toHaveBeenCalledWith(401);
// //     expect(res.json).toHaveBeenCalledWith('You are not authenticated!');
// //     expect(mockNext).not.toHaveBeenCalled();
// //   });

// //   it('should return 401 when authorization header is malformed', () => {
// //     const req = createMockRequest('InvalidHeader');
// //     const res = createMockResponse();

// //     verifyToken(req, res, mockNext);

// //     expect(res.status).toHaveBeenCalledWith(401);
// //     expect(res.json).toHaveBeenCalledWith('You are not authenticated!');
// //     expect(mockNext).not.toHaveBeenCalled();
// //   });
// // });

// import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
// import jwt from 'jsonwebtoken';
// import verifyToken from '../../../server/middleware/verifyToken';

// describe('verifyToken middleware', () => {
//   let mockNext;
//   let originalJwtSecret;

//   // Mock objects to simulate Express req, res, and next
//   const createMockRequest = (authHeader) => ({
//     headers: {
//       authorization: authHeader,
//     },
//   });

//   const createMockResponse = () => {
//     const res = {
//       status: vi.fn().mockReturnThis(),
//       json: vi.fn(),
//     };
//     return res;
//   };

//   beforeEach(() => {
//     vi.clearAllMocks();
//     mockNext = vi.fn();
//     originalJwtSecret = process.env.JWT_SECRET;
//     process.env.JWT_SECRET = 'test-secret';
//   });

//   afterAll(() => {
//     process.env.JWT_SECRET = originalJwtSecret;
//   });

//   it('should call next() when token is valid', async () => {
//     const mockUser = { id: '123' };
//     vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
//       callback(null, mockUser);
//     });

//     const req = createMockRequest('Bearer valid.token.here');
//     const res = createMockResponse();

//     // Use async/await here to handle the callback correctly
//     await verifyToken(req, res, mockNext);

//     expect(jwt.verify).toHaveBeenCalledWith(
//       'valid.token.here',
//       process.env.JWT_SECRET,
//       expect.any(Function)
//     );
//     expect(req.userId).toBe('123');
//     expect(mockNext).toHaveBeenCalled();
//     expect(res.status).not.toHaveBeenCalled();
//   });

//   it('should return 403 when token is invalid', async () => {
//     vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
//       callback(new Error('Invalid token'), null);
//     });

//     const req = createMockRequest('Bearer invalid.token.here');
//     const res = createMockResponse();

//     await verifyToken(req, res, mockNext);

//     expect(jwt.verify).toHaveBeenCalledWith(
//       'invalid.token.here',
//       process.env.JWT_SECRET,
//       expect.any(Function)
//     );
//     expect(res.status).toHaveBeenCalledWith(403);
//     expect(res.json).toHaveBeenCalledWith('Token is not valid!');
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should return 401 when no authorization header is present', () => {
//     const req = createMockRequest(undefined);
//     const res = createMockResponse();

//     verifyToken(req, res, mockNext);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith('You are not authenticated!');
//     expect(mockNext).not.toHaveBeenCalled();
//   });

//   it('should return 401 when authorization header is malformed', () => {
//     const req = createMockRequest('InvalidHeader');
//     const res = createMockResponse();

//     verifyToken(req, res, mockNext);

//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith('You are not authenticated!');
//     expect(mockNext).not.toHaveBeenCalled();
//   });
// });

import { describe, it, expect, vi } from 'vitest';
import jwt from 'jsonwebtoken';
import verifyToken from '../../../server/middleware/verifyToken';

describe('verifyToken middleware', () => {
  // Create mock objects to simulate Express req, res, and next
  const createMockRequest = (authHeader) => ({
    headers: {
      authorization: authHeader
    }
  });

  const createMockResponse = () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
    return res;
  };

  const mockNext = vi.fn();

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure JWT_SECRET is set for tests
    process.env.JWT_SECRET = 'test-secret';
  });

  it('should handle missing authorization header', () => {
    const req = createMockRequest(undefined);
    const res = createMockResponse();

    verifyToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("You are not authenticated!");
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle malformed authorization header (missing Bearer)', () => {
    const req = createMockRequest('InvalidToken');
    const res = createMockResponse();

    verifyToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("You are not authenticated!");
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle missing token after Bearer', () => {
    const req = createMockRequest('Bearer ');
    const res = createMockResponse();

    verifyToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("You are not authenticated!");
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle token verification error', () => {
    // Mock JWT verification to simulate an error
    vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
      callback(new Error('Verification failed'), null);
    });

    const req = createMockRequest('Bearer valid.token.here');
    const res = createMockResponse();

    verifyToken(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      'valid.token.here', 
      process.env.JWT_SECRET, 
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("Token is not valid!");
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle missing or invalid user payload', () => {
    // Mock JWT verification with an empty user object
    vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
      callback(null, {});
    });

    const req = createMockRequest('Bearer valid.token.here');
    const res = createMockResponse();

    verifyToken(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      'valid.token.here', 
      process.env.JWT_SECRET, 
      expect.any(Function)
    );
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith("Invalid token payload!");
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should successfully verify token and call next', () => {
    // Mock JWT verification with a valid user
    const mockUser = { id: '123' };
    vi.spyOn(jwt, 'verify').mockImplementation((token, secret, callback) => {
      callback(null, mockUser);
    });

    const req = createMockRequest('Bearer valid.token.here');
    const res = createMockResponse();

    verifyToken(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      'valid.token.here', 
      process.env.JWT_SECRET, 
      expect.any(Function)
    );
    expect(req.userId).toBe('123');
    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
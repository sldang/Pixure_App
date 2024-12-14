// // middleware/verifyToken.js
// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) return res.status(403).json("Token is not valid!");
//       req.userId = user.id; // Attach userId to the request object from the decoded JWT payload
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authenticated!");
//   }
// };

// module.exports = verifyToken;

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json("You are not authenticated!"); // Missing or malformed header
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json("You are not authenticated!"); // No token provided
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json("Token is not valid!"); // Invalid token
    }

    if (!user || !user.id) {
      return res.status(403).json("Invalid token payload!"); // Missing or invalid payload
    }

    req.userId = user.id; // Attach userId to the request object from the decoded JWT payload
    next();
  });
};

module.exports = verifyToken;

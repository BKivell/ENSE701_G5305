// middleware/auth.js

const jwt = require('jsonwebtoken');
const config = require('config');

// Load the JWT secret key from the configuration
const jwtSecret = `${process.env.jwtSecret}` || config.get('jwtSecret');

// Verify JWT middleware
function verifyToken(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

module.exports = verifyToken;

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '14400m',
  algorithm: 'HS256',
};
const generateJWTToken = (email) => jwt.sign({ email }, JWT_SECRET, jwtConfig);

const authenticateToken = async (token) => {
  if (!token) {
    const error = { status: 401, message: 'Token not found' };
    throw error;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    const err = { status: 401, message: 'Expired or invalid token' };
    throw err;
  }
};

module.exports = {
  generateJWTToken,
  authenticateToken,
};

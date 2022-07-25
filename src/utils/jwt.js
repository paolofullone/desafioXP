const jwt = require('jsonwebtoken');
const xpError = require('./error');

const { JWT_SECRET } = process.env;

const jwtConfig = {
  expiresIn: '14400m',
  algorithm: 'HS256',
};
const generateJWTToken = (email, userId) => jwt.sign({ email, userId }, JWT_SECRET, jwtConfig);

const authenticateToken = async (token) => {
  if (!token) throw xpError(400, 'Token não encontrado.');
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw xpError(401, 'Token expirado ou inválido');
  }
};

module.exports = {
  generateJWTToken,
  authenticateToken,
};

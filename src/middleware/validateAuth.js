const { authenticateToken } = require('../utils/jwt');

const validateAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await authenticateToken(token);
  res.user = user;
  next();
};

module.exports = validateAuth;

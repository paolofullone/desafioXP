const { authenticateToken } = require('../utils/jwt');

const validateAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const user = await authenticateToken(authorization);
  res.user = user;
  next();
};

module.exports = validateAuth;

const xpError = require('../utils/error');

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw xpError(400, 'Favor informar os campos email e password.');
  }
  next();
};

module.exports = validateLogin;

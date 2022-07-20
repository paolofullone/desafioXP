const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    const error = { status: 400, message: 'Favor informar os campos email e password.' };
    throw error;
  }
  next();
};

module.exports = validateLogin;

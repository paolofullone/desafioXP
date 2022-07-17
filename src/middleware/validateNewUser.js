const validateNewUser = (req, res, next) => {
  const {
    email, password, userName, ballance,
  } = req.body;
  if (!email || !password || !userName || !ballance) {
    const error = { status: 400, message: 'Favor informar todos os campos para criação do usuário.' };
    throw error;
  }
  return next();
};

module.exports = validateNewUser;

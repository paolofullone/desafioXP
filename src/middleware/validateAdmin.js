const usersModel = require('../models/usersModel');
const xpError = require('../utils/error');

const validateAdmin = async (_req, res, next) => {
  const { email } = res.user;
  const user = await usersModel.getByEmail(email);
  if (user[0].role !== 'admin') {
    throw xpError(403, 'Acesso negado, verifque suas credenciais com o administrador do banco de dados.');
  }
  next();
};

module.exports = validateAdmin;

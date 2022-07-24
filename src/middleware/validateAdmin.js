const usersModel = require('../models/usersModel');

const validateAdmin = async (_req, res, next) => {
  const { email } = res.user;
  const user = await usersModel.getByEmail(email);
  if (user[0].role !== 'admin') {
    const error = { status: 403, message: 'Acesso negado, verifque suas credenciais com o administrador do banco de dados.' };
    throw error;
  }
  next();
};

module.exports = validateAdmin;

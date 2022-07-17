const usersModel = require('../models/usersModel');

const validateAdmin = async (email) => {
  const user = await usersModel.getByEmail(email);
  if (user[0].role !== 'admin') {
    const error = { status: 400, message: 'Seu usuário não permite a criação no banco de dados.' };
    throw error;
  }
  return true;
};

module.exports = validateAdmin;

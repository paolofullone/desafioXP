const clientsModel = require('../models/usersModel');
const { generateJWTToken } = require('../utils/jwt');

const getAll = async () => {
  const clients = await clientsModel.getAll();
  return clients;
};

const getByEmailAndPassword = async (email, password) => {
  const client = await clientsModel.getByEmailAndPassword(email, password);
  if (!client.length) {
    const error = { status: 400, message: 'Email ou senha inválido(s).' };
    throw error;
  }
  return generateJWTToken(email);
};

module.exports = { getAll, getByEmailAndPassword };

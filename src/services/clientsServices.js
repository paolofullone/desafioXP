const clientsModel = require('../models/clientsModel');
const { generateJWTToken } = require('../utils/jwt');

const getAll = async () => {
  const clients = await clientsModel.getAll();
  return clients;
};

const getByEmail = async (email, password) => {
  const client = await clientsModel.getByEmail(email, password);
  if (!client) {
    const error = { status: 400, message: 'Invalid email or password' };
    throw error;
  }
  return generateJWTToken(email);
};

module.exports = { getAll, getByEmail };

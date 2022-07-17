const { v4: uuidv4 } = require('uuid');
const validateAdmin = require('../middleware/validateAdmin');
const usersModel = require('../models/usersModel');
const { generateJWTToken } = require('../utils/jwt');

const getAll = async (email) => {
  const users = await usersModel.getAll(email);
  return users;
};

const getByEmailAndPassword = async (email, password) => {
  const client = await usersModel.getByEmailAndPassword(email, password);
  if (!client.length) {
    const error = { status: 400, message: 'Email ou senha inválido(s).' };
    throw error;
  }
  return generateJWTToken(email);
};

const getBallance = async (email) => {
  const user = await usersModel.getByEmail(email);
  return user[0].ballance;
};

const transaction = async (email, amount, route) => {
  const ballance = await usersModel.transaction(email, amount, route);
  return ballance;
};

const create = async (user, email) => {
  await validateAdmin(email);
  const userId = uuidv4();
  const newUser = await usersModel.create(userId, user);
  return newUser;
};

module.exports = {
  getAll, getByEmailAndPassword, getBallance, transaction, create,
};

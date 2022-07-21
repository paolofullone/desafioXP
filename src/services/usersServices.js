const { v4: uuidv4 } = require('uuid');
const usersModel = require('../models/usersModel');
const { generateJWTToken } = require('../utils/jwt');

const getAll = async (email) => {
  const users = await usersModel.getAll(email);
  return users;
};

const getById = async (id) => {
  const user = await usersModel.getById(id);
  if (!user.length) {
    const error = { status: 404, message: 'Usuário não encontrado.' };
    throw error;
  }
  return user;
};

const getByEmailAndPassword = async (email, password) => {
  const client = await usersModel.getByEmailAndPassword(email, password);
  if (!client.length) {
    const error = { status: 401, message: 'Usuário não encontrado, favor verificar email e senha informados.' };
    throw error;
  }
  const userId = client[0].user_id;
  return generateJWTToken(email, userId);
};

const getBallance = async (email) => {
  const user = await usersModel.getByEmail(email);
  return user[0].ballance;
};

const transaction = async (email, amount, route) => {
  const ballance = await usersModel.transaction(email, amount, route);
  return ballance;
};

const create = async (user) => {
  const userId = uuidv4();
  try {
    const newUser = await usersModel.create(userId, user);
    return newUser;
  } catch (error) {
    const err = { status: 409, message: 'Usuário já existe no banco de dados. Favor informar um email e CPF únicos' };
    throw err;
  }
};

const deleteUser = async (id) => {
  const deletedUser = await usersModel.deleteUser(id);
  const { affectedRows } = deletedUser;
  if (affectedRows === 0) {
    const error = { status: 404, message: 'Usuário não encontrado.' };
    throw error;
  }
  return deletedUser;
};

const updateUser = async (id, user) => {
  const updatedUser = await usersModel.updateUser(id, user);
  if (!updatedUser.length) {
    const error = { status: 404, message: 'Usuário não encontrado.' };
    throw error;
  }
  return updatedUser;
};

module.exports = {
  getAll,
  getById,
  getByEmailAndPassword,
  getBallance,
  transaction,
  create,
  deleteUser,
  updateUser,
};

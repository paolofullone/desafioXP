const { v4: uuidv4 } = require('uuid');
const usersModel = require('../models/usersModel');
const { generateJWTToken } = require('../utils/jwt');
const xpError = require('../utils/error');

const getAll = async (email) => usersModel.getAll(email);

const getById = async (id) => {
  const user = await usersModel.getById(id);
  if (!user.length) {
    throw xpError(404, 'Usuário não encontrado.');
  }
  return user;
};

const getByEmailAndPassword = async (email, password) => {
  const client = await usersModel.getByEmailAndPassword(email, password);
  if (!client.length) {
    throw xpError(401, 'Usuário não encontrado, favor verificar email e senha informados.');
  }
  const userId = client[0].user_id;
  return generateJWTToken(email, userId);
};

const getBallance = async (email) => {
  const user = await usersModel.getByEmail(email);
  return user[0].ballance;
};

const transaction = async (email, amount, route) => usersModel.transaction(email, amount, route);

const create = async (user) => {
  const userId = uuidv4();
  try {
    const newUser = await usersModel.create(userId, user);
    if (!newUser.length) {
      throw new Error();
    }
    return newUser;
  } catch (error) {
    throw xpError(409, 'Usuário já existe no banco de dados. Favor informar um email e CPF únicos.');
  }
};

const deleteUser = async (id) => {
  const deletedUser = await usersModel.deleteUser(id);
  const { affectedRows } = deletedUser;
  if (affectedRows === 0) {
    throw xpError(404, 'Usuário não encontrado.');
  }
  return true;
};

const updateUser = async (id, user) => {
  const updatedUser = await usersModel.updateUser(id, user);
  if (!updatedUser.length) {
    throw xpError(404, 'Usuário não encontrado.');
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

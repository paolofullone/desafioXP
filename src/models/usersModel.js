const connection = require('../db/connection');
const { totalOperationValue } = require('../utils/totalOpValue');
const stocksModel = require('./stocksModel');

const getByEmail = async (email) => {
  const [user] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
  return user;
};

const getAll = async (email) => {
  const user = await getByEmail(email);
  if (user[0].role === 'client') {
    const [client] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    return client;
  }
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const getById = async (id) => {
  const [user] = await connection.execute('SELECT * FROM users WHERE user_id = ?', [id]);
  return user;
};

const getByEmailAndPassword = async (email, password) => {
  const [user] = await connection.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  // userWallet(user);
  return user;
};

const updateBallance = async (userId, route, requestedOperations) => {
  const operationType = route === '/purchase' ? '-' : '+';
  const stocks = await stocksModel.getAll();
  const totalValue = totalOperationValue(requestedOperations, stocks);
  const buyOrSellValue = operationType === '-' ? -totalValue : +totalValue;
  const result = await connection.execute(
    'UPDATE users SET ballance = ballance + ? WHERE user_id = ?',
    [buyOrSellValue, userId],
  );
  return result;
};

const transaction = async (email, amount, route) => {
  const [user] = await getByEmail(email);
  const userId = user.user_id;
  const typeOperation = route === '/withdraw' ? '-' : '+';
  const transactionValue = typeOperation === '-' ? -amount : +amount;
  await connection.execute(
    'UPDATE users SET ballance = ballance + ? WHERE user_id = ?',
    [transactionValue, userId],
  );
  const updatedUser = await getByEmail(email);
  return updatedUser[0].ballance;
};

const create = async (userId, user) => {
  const role = 'client';
  const {
    email, cpf, password, userName, ballance,
  } = user;
  await connection.execute(
    'INSERT INTO users (user_id, email, cpf, password, name, ballance, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [userId, email, cpf, password, userName, ballance, role, new Date(), new Date()],
  );
  // console.log(bduser);
  const newUser = await getByEmail(email);
  return newUser;
};

const deleteUser = async (id) => {
  const [deletedUser] = await connection.execute('DELETE FROM users WHERE user_id = ?', [id]);
  return deletedUser;
};

const updateUser = async (id, user) => {
  const {
    email, password, userName, ballance,
  } = user;
  const [updatedUser] = await connection.execute(
    'UPDATE users SET email = ?, password = ?, name = ?, ballance = ?, updated_at = ? WHERE user_id = ?',
    [email, password, userName, ballance, new Date(), id],
  );
  return updatedUser;
};

module.exports = {
  getAll,
  getById,
  getByEmail,
  getByEmailAndPassword,
  updateBallance,
  transaction,
  create,
  deleteUser,
  updateUser,
};

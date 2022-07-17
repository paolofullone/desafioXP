const connection = require('../db/connection');
const { totalOperationValue } = require('../utils/totalOpValue');
const stocksModel = require('./stocksModel');

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const getByEmail = async (email) => {
  const [user] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
  return user;
};

const getByEmailAndPassword = async (email, password) => {
  const [user] = await connection.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  // userWallet(user);
  return user;
};

const updateBallance = async (userId, route, operations) => {
  // console.log(userId, route, operations);
  const operationType = route === '/purchase' ? '-' : '+';
  const stocks = await stocksModel.getAll();
  const totalValue = totalOperationValue(operations, stocks);
  // console.log('totalValue', totalValue);
  const buyOrSellValue = operationType === '-' ? -totalValue : +totalValue;
  // console.log(operationType, totalValue, buyOrSellValue);
  const [updatedUser] = await connection.execute(
    'UPDATE users SET ballance = ballance + ? WHERE user_id = ?',
    [buyOrSellValue, userId],
  );
  return updatedUser;
};

module.exports = {
  getAll, getByEmail, getByEmailAndPassword, updateBallance,
};

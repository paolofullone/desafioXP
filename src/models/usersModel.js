const connection = require('../db/connection');
// const { userWallet } = require('../utils/userWallet');

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

module.exports = { getAll, getByEmail, getByEmailAndPassword };

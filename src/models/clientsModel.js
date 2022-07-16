const connection = require('../db/connection');

const getAll = async () => {
  const [clients] = await connection.execute('SELECT * FROM clients');
  return clients;
};

const getByEmail = async (email, password) => {
  const [client] = await connection.execute('SELECT * FROM clients WHERE email = ? AND password = ?', [email, password]);
  return client;
};

module.exports = { getAll, getByEmail };

const connection = require('../db/connection');

const getAll = async () => {
  const [stocks] = await connection.execute('SELECT * FROM stocks');
  return stocks;
};

module.exports = { getAll };

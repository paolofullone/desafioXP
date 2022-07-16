const connection = require('../db/connection');

const getAll = async () => {
  const [stocksOps] = await connection.execute('SELECT * FROM stock_client_ops');
  return stocksOps;
};

module.exports = { getAll };

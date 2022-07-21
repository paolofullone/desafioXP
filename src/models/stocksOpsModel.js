const connection = require('../db/connection');

const getAll = async () => {
  const [stocksOps] = await connection.execute(
    'SELECT * FROM stock_client_ops',
  );
  return stocksOps;
};

const getWalletByUserId = async (userId) => {
  const [stocksOps] = await connection.execute(
    'SELECT * FROM stock_client_ops WHERE user_id = ?',
    [userId],
  );
  return stocksOps;
};

const create = async (opId, userId, newOperation, route) => {
  const operationType = route === '/purchase' ? 'buy' : 'sell';
  const { stockId, quantity, stockPrice } = newOperation;
  const totalValue = quantity * stockPrice[0].value;
  const [value] = await connection.execute(
    'SELECT value FROM stocks WHERE stock_id = ?',
    [stockId],
  );
  const [stockOperation] = await connection.execute(
    'INSERT INTO stock_client_ops (op_id, stock_id, user_id, quantity, value, total_value, operation, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [opId,
      stockId,
      userId,
      quantity,
      value[0].value,
      totalValue,
      operationType,
      new Date(),
      new Date()],
  );
  return stockOperation;
};

module.exports = { getAll, create, getWalletByUserId };

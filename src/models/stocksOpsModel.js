const connection = require('../db/connection');

const getAll = async (email) => {
  const [user] = await connection.execute(
    'SELECT * FROM users WHERE email = ?',
    [email],
  );

  const { role } = user[0];
  if (role === 'client') {
    const [stocksOps] = await connection.execute(
      'SELECT * FROM stock_client_ops WHERE user_id = ?',
      [user[0].user_id],
    );
    return stocksOps;
  }
  const [stocksOps] = await connection.execute(
    'SELECT * FROM stock_client_ops',
  );
  return stocksOps;
};

const create = async (opId, userId, stock, route) => {
  const operation = route === '/purchase' ? 'buy' : 'sell';
  const { stockId, quantity } = stock;
  const [value] = await connection.execute(
    'SELECT value FROM stocks WHERE stock_id = ?',
    [stockId],
  );
  const [stockOperation] = await connection.execute(
    'INSERT INTO stock_client_ops (op_id, stock_id, user_id, quantity, value, operation, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [opId, stockId, userId, quantity, value[0].value, operation, new Date(), new Date()],
  );
  return stockOperation;
};

module.exports = { getAll, create };

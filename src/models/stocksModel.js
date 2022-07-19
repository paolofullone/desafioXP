const connection = require('../db/connection');

const getAll = async () => {
  const [stocks] = await connection.execute('SELECT * FROM stocks');
  return stocks;
};

const getById = async (stockId) => {
  const [stock] = await connection.execute('SELECT * FROM stocks WHERE stock_id = ?', [stockId]);
  return stock;
};

const update = async (stock, route) => {
  const operation = route === '/purchase' ? '-' : '+';
  const { stockId } = stock;
  let { quantity } = stock;
  quantity = operation === '-' ? -quantity : +quantity;
  const [updatedStock] = await connection.execute(
    'UPDATE stocks SET quantity = quantity + ? WHERE stock_id = ?',
    [quantity, stockId],
  );
  return updatedStock;
};

const create = async (stock, stockId) => {
  console.log(stock);
  const {
    availableQuantity, value, ticker, name,
  } = stock;
  await connection.execute(
    'INSERT INTO stocks (stock_id, available_quantity, value, ticker, name, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [stockId, availableQuantity, value, ticker, name, new Date(), new Date()],
  );

  const stockCreated = await getById(stockId);
  return stockCreated;
};

module.exports = {
  getAll, getById, update, create,
};

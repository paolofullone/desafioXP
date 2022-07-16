const connection = require('../db/connection');

const getAll = async () => {
  const [stocks] = await connection.execute('SELECT * FROM stocks');
  return stocks;
};

const update = async (stock, route) => {
  const operation = route === '/purchase' ? '-' : '+';
  const { stockId } = stock;
  let { quantity } = stock;
  quantity = operation === '-' ? quantity : -quantity;
  const [updatedStock] = await connection.execute(
    'UPDATE stocks SET quantity = quantity + ? WHERE stock_id = ?',
    [quantity, stockId],
  );
  return updatedStock;
};

module.exports = { getAll, update };

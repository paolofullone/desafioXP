const stocksModel = require('../models/stocksModel');
const xpError = require('../utils/error');

const validateSellStocks = async (req, res, next) => {
  const requestedOperations = req.body;
  if (!requestedOperations.length) {
    throw xpError(400, 'Favor informar ao menos uma operação de venda.');
  }
  const promises = requestedOperations.map(async (operation) => {
    const stock = await stocksModel.getById(operation.stockId);
    if (!stock.length) {
      throw xpError(400, `A ação com id ${operation.stockId} informada não existe.`);
    }
    if (!operation.stockId || !operation.quantity) {
      throw xpError(400, 'Favor informar o ID e a quantidade da ação.');
    }
    if (operation.quantity <= 0) {
      throw xpError(400, 'A quantidade da ação deve ser maior que zero.');
    }
  });
  Promise.all(promises)
    .then(() => next())
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports = validateSellStocks;

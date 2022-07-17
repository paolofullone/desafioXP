const stocksModel = require('../models/stocksModel');

const validateSellStocks = async (req, res, next) => {
  const requestedOperations = req.body;
  if (!requestedOperations.length) {
    const error = { status: 400, message: 'Favor informar ao menos uma operação de venda.' };
    throw error;
  }
  const promises = requestedOperations.map(async (operation) => {
    const stock = await stocksModel.getById(operation.stockId);
    if (!stock.length) {
      const error = { status: 400, message: `A ação com id ${operation.stockId} informada não existe.` };
      throw error;
    }
    if (!operation.stockId || !operation.quantity) {
      const error = { status: 400, message: 'Favor informar o ID e a quantidade da ação.' };
      throw error;
    }
    if (operation.quantity <= 0) {
      const error = { status: 400, message: 'A quantidade da ação deve ser maior que zero.' };
      throw error;
    }
  });
  Promise.all(promises)
    .then(() => next())
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports = validateSellStocks;

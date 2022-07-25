const stocksModel = require('../models/stocksModel');
const xpError = require('../utils/error');

const validate = async (requestedOperations, _req, res, next) => {
  const promises = requestedOperations.map(async (operation) => {
    const stock = await stocksModel.getById(operation.stockId);
    if (operation.quantity > stock[0].quantity) {
      const noStock = await stocksModel.getById(operation.stockId);
      throw new Error(`Infelizmente não temos ${operation.quantity} ações da empresa ${noStock[0].name} disponíveis.`);
    }
    if (operation.quantity < 0 || typeof operation.quantity !== 'number') {
      throw new Error('A quantidade deve ser um número maior que zero.');
    }
  });
  Promise.all(promises)
    .then(() => next())
    .catch((err) => res.status(400).json({ error: err.message }));
};

const validateStocks = async (req, res, next) => {
  const requestedOperations = req.body;
  if (!requestedOperations.length) {
    throw xpError(400, 'Favor informar ao menos uma operação.');
  }
  validate(requestedOperations, req, res, next);
};

module.exports = validateStocks;

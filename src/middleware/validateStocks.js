const stocksModel = require('../models/stocksModel');

const validate = async (requestedOperations, _req, res, next) => {
  const promises = requestedOperations.map(async (operation) => {
    const stock = await stocksModel.getById(operation.stockId);
    if (operation.quantity > stock[0].quantity) {
      const noStock = await stocksModel.getById(operation.stockId);
      throw new Error(`Infelizmente não temos ${operation.quantity} ações da empresa ${noStock[0].name} disponíveis.`);
    }
    if (operation.quantity < 0) {
      throw new Error('A quantidade deve ser maior que zero.');
    }
  });
  Promise.all(promises)
    .then(() => next())
    .catch((err) => res.status(400).json({ error: err.message }));
};

const validateStocks = async (req, res, next) => {
  const requestedOperations = req.body;
  if (!requestedOperations.length) {
    const error = { status: 400, message: 'Favor informar ao menos uma operação.' };
    throw error;
  }
  validate(requestedOperations, req, res, next);
};

module.exports = validateStocks;

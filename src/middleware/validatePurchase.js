const stocksModel = require('../models/stocksModel');

const validatePurchase = (req, res, next) => {
  const operations = req.body;
  const promises = operations.map(async (operation) => {
    const stock = await stocksModel.getById(operation.stockId);

    if (operation.quantity > stock[0].quantity) {
      const noStock = await stocksModel.getById(operation.stockId);
      throw new Error(`Infelizmente não temos ${operation.quantity} ações da empresa ${noStock[0].name} disponíveis.`);
    }
  });
  Promise.all(promises)
    .then(() => next())
    .catch((err) => res.status(400).json({ error: err.message }));
  if (!operations.length) {
    const error = { status: 400, message: 'Favor informar ao menos uma operação.' };
    throw error;
  }
};

module.exports = validatePurchase;

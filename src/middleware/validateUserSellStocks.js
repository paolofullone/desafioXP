const stocksOpsModel = require('../models/stocksOpsModel');
const stocksModel = require('../models/stocksModel');
const { userWallet } = require('../utils/userWallet');
const xpError = require('../utils/error');

const validateUserSellStocks = async (req, res, next) => {
  const requestedOperations = req.body;
  const { userId } = res.user;
  const stocksOps = await stocksOpsModel.getWalletByUserId(userId);
  const wallet = await userWallet(stocksOps);
  const promises = requestedOperations.map(async (operation) => {
    const { stockId, quantity } = operation;
    const stock = await stocksModel.getById(stockId);
    if (!stock.length) {
      throw xpError(400, `Ação ${operation.stockId} não encontrada na corretora.`);
    }
    const validStock = wallet.find((s) => s.stock_id === stockId);
    if (!validStock) {
      throw xpError(400, `Ação ${operation.stockId} não encontrada na carteira`);
    }
    if (validStock.quantity < quantity) {
      throw xpError(400, `Quantidade em carteira da ação ${operation.stockId} é menor que a quantidade solicitada para venda.`);
    }

    return operation;
  });
  Promise.all(promises)
    .then(() => next())
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports = validateUserSellStocks;

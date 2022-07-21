const stocksOpsModel = require('../models/stocksOpsModel');
const stocksModel = require('../models/stocksModel');
const { userWallet } = require('../utils/userWallet');

const validateUserSellStocks = async (req, res, next) => {
  const requestedOperations = req.body;
  const { userId } = res.user;
  const stocksOps = await stocksOpsModel.getWalletByUserId(userId);
  const wallet = await userWallet(stocksOps);
  const promises = requestedOperations.map(async (operation) => {
    const { stockId, quantity } = operation;
    const stock = await stocksModel.getById(stockId);
    if (!stock.length) {
      const error = { status: 400, message: `Ação ${operation.stockId} não encontrada na corretora.` };
      throw error;
    }
    const validStock = wallet.find((s) => s.stock_id === stockId);
    if (!validStock) {
      const error = { status: 400, message: `Ação ${operation.stockId} não encontrada na carteira` };
      throw error;
    }
    if (validStock.quantity < quantity) {
      const error = {
        status: 400,
        message: `Quantidade em carteira da ação ${operation.stockId} é menor que a quantidade solicitada para venda.`,
      };
      throw error;
    }
    return operation;
  });
  Promise.all(promises)
    .then(() => next())
    .catch((err) => res.status(400).json({ error: err.message }));
};

module.exports = validateUserSellStocks;

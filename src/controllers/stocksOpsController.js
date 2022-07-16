const stocksOpsService = require('../services/stocksOpsService');

const getAll = async (_req, res) => {
  const stocks = await stocksOpsService.getAll();
  return res.status(200).json(stocks);
};

module.exports = { getAll };

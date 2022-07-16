const stocksService = require('../services/stocksService');

const getAll = async (_req, res) => {
  const stocks = await stocksService.getAll();
  return res.status(200).json(stocks);
};

module.exports = { getAll };

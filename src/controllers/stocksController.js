const stocksService = require('../services/stocksService');

const getAll = async (_req, res) => {
  const stocks = await stocksService.getAll();
  return res.status(200).json(stocks);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const stock = await stocksService.getById(id);
  return res.status(200).json(stock);
};

const create = async (req, res) => {
  const stock = req.body;
  const { email } = res.user;
  const newStock = await stocksService.create(stock, email);
  return res.status(201).json(newStock);
};

module.exports = { getAll, getById, create };

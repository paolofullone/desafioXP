const stocksOpsService = require('../services/stocksOpsService');

const getAll = async (req, res) => {
  const { email } = res.user;
  const stocks = await stocksOpsService.getAll(email);
  return res.status(200).json(stocks);
};

const getByUserId = async (req, res) => {
  const wallet = await stocksOpsService.getByUserId(res.user.email);
  return res.status(200).json(wallet);
};

const create = async (req, res) => {
  const { email } = res.user;
  const route = req.route.path;
  const stocks = req.body;
  const stock = await stocksOpsService.create(email, stocks, route);
  return res.status(201).json(stock);
};

module.exports = { getAll, create, getByUserId };

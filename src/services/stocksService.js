const { v4: uuidv4 } = require('uuid');
const validateAdmin = require('../middleware/validateAdmin');

const stocksModel = require('../models/stocksModel');

const getAll = async () => {
  const stocks = await stocksModel.getAll();
  return stocks;
};

const getById = async (id) => {
  const stock = await stocksModel.getById(id);
  return stock;
};

const create = async (stock, email) => {
  await validateAdmin(email);
  const stockId = uuidv4();
  const newStock = await stocksModel.create(stock, stockId);
  return newStock;
};

module.exports = { getAll, getById, create };

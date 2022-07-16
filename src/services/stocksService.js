const stocksModel = require('../models/stocksModel');

const getAll = async () => {
  const stocks = await stocksModel.getAll();
  return stocks;
};

module.exports = { getAll };

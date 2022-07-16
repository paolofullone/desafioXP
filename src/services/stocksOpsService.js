const stocksOpsModel = require('../models/stocksOpsModel');

const getAll = async () => {
  const stocksOps = await stocksOpsModel.getAll();
  return stocksOps;
};

module.exports = { getAll };

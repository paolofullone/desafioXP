const { v4: uuidv4 } = require('uuid');
const stocksOpsModel = require('../models/stocksOpsModel');
const stocksModel = require('../models/stocksModel');
const usersModel = require('../models/usersModel');

const getAll = async (email) => {
  const stocksOps = await stocksOpsModel.getAll(email);
  return stocksOps;
};

const createOperations = (stocks, userId, route) => {
  stocks.forEach(async (stock) => {
    const opId = uuidv4();
    await stocksOpsModel.create(opId, userId[0].user_id, stock, route);
  });
};

const updateStocks = async (stocks, route) => {
  stocks.forEach(async (stock) => {
    await stocksModel.update(stock, route);
  });
};

const create = async (email, stocks, route) => {
  const userId = await usersModel.getByEmail(email);
  createOperations(stocks, userId, route);
  updateStocks(stocks, route);
  return 'ok';
};

module.exports = { getAll, create };

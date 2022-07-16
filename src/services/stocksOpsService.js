const { v4: uuidv4 } = require('uuid');
const stocksOpsModel = require('../models/stocksOpsModel');
const usersModel = require('../models/usersModel');

const getAll = async (email) => {
  const stocksOps = await stocksOpsModel.getAll(email);
  return stocksOps;
};

const create = async (email, stocks, route) => {
  const userId = await usersModel.getByEmail(email);
  stocks.forEach(async (stock) => {
    const opId = uuidv4();
    await stocksOpsModel.create(opId, userId[0].user_id, stock, route);
  });
  // const stockOperation = await stocksOpsModel.create(email, body);
  return 'ok';
};

module.exports = { getAll, create };

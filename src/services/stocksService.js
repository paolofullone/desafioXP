const { v4: uuidv4 } = require('uuid');

const stocksModel = require('../models/stocksModel');
const xpError = require('../utils/error');

const getAll = async () => {
  const stocks = await stocksModel.getAll();
  return stocks;
};

const getById = async (id) => {
  const stock = await stocksModel.getById(id);
  if (!stock.length) {
    throw xpError(404, 'Ação não encontrada.');
  }
  return stock;
};

const create = async (stock) => {
  const stockId = uuidv4();
  try {
    const newStock = await stocksModel.create(stock, stockId);
    return newStock;
  } catch (error) {
    throw xpError(409, 'Erro ao criar ação ou ação existente');
  }
};

module.exports = { getAll, getById, create };

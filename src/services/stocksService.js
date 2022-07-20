const { v4: uuidv4 } = require('uuid');
// const validateAdmin = require('../middleware/validateAdmin');

const stocksModel = require('../models/stocksModel');

const getAll = async () => {
  const stocks = await stocksModel.getAll();
  return stocks;
};

const getById = async (id) => {
  const stock = await stocksModel.getById(id);
  if (!stock.length) {
    const error = { status: 404, message: 'Ação não encontrada.' };
    throw error;
  }
  return stock;
};

const create = async (stock) => {
  // await validateAdmin(email);
  const stockId = uuidv4();
  try {
    const newStock = await stocksModel.create(stock, stockId);
    return newStock;
  } catch (error) {
    const err = { status: 409, message: 'Erro ao criar ação ou ação existente' };
    throw err;
  }
};

module.exports = { getAll, getById, create };

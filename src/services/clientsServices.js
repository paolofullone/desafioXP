const clientsModel = require('../models/clientsModel');

const getAll = async () => {
  const clients = await clientsModel.getAll();
  return clients;
};

module.exports = { getAll };

const clientsService = require('../services/clientsServices');

const getAll = async (_req, res) => {
  const clients = await clientsService.getAll();
  return res.status(200).json(clients);
};

module.exports = {getAll};

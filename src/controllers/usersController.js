const usersServices = require('../services/usersServices');

const getAll = async (_req, res) => {
  const clients = await usersServices.getAll();
  return res.status(200).json(clients);
};

module.exports = { getAll };

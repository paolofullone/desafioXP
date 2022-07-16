const clientsServices = require('../services/clientsServices');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await clientsServices.getByEmail(email, password);
  res.send({ token });
};

module.exports = { login };

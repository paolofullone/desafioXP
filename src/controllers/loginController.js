const usersServices = require('../services/usersServices');

const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await usersServices.getByEmailAndPassword(email, password);
  res.send({ token });
};

module.exports = { login };

const connection = require('../db/connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM clients');
  return rows;
};

module.exports = {getAll};

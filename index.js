require('express-async-errors');
require('dotenv/config');
require('cors');

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_req, res) => {
  res.send(`<h1> Hello World on port: ${PORT} </h1>`);
});

app.use((err, _req, res, next) => {
  res.status(err.status || 500).json({message: err.message});
  next();
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});

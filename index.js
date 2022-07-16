const express = require('express');
require('express-async-errors');
require('dotenv').config();

const cors = require('cors');

const { PORT } = process.env || 3000;

const clientsRouter = require('./src/routes/clientsRouter');
const stocksRouter = require('./src/routes/stocksRouter');
const stocksOpsRouter = require('./src/routes/StocksOpsRouter');
const loginRouter = require('./src/routes/loginRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/clients', clientsRouter);
app.use('/stocks', stocksRouter);
app.use('/stocksOperations', stocksOpsRouter);
app.use('/login', loginRouter);

// hello world
app.get('/', (_req, res) => {
  res.send(`Hello World!!! Running on Heroku Port: ${PORT}`);
});

app.use((err, _req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

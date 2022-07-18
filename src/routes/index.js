const express = require('express');

const app = express();

const usersRouter = require('./usersRouter');
const stocksRouter = require('./stocksRouter');
const stocksOpsRouter = require('./StocksOpsRouter');
const loginRouter = require('./loginRouter');

app.use('/users', usersRouter);
app.use('/stocks', stocksRouter);
app.use('/stocksOperations', stocksOpsRouter);
app.use('/login', loginRouter);

module.exports = app;

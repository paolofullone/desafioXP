const express = require('express');
require('express-async-errors');
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const cors = require('cors');

const routes = require('./src/routes');
const swaggerConfig = require('./src/docs/swaggerConfig');

const { PORT } = process.env || 3000;

const app = express();
app.use(express.json());
app.use(cors());

const swaggerDocs = swaggerJsDoc(swaggerConfig);

app.use('/', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// hello world
app.get('/', (_req, res) => {
  res.send(`<h1>Olá pessoal, página do Paolo Fullone para o desafio da XP Inc. rodando na porta: ${PORT}.`
    + ' Para acessar o swagger acesse: /docs</h1>');
});

app.use((err, _req, res, next) => {
  // console.error(err);
  res.status(err.status || 500).json({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

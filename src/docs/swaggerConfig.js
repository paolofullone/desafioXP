const swaggerConfig = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Desafio XP - Backend',
      description: 'API para o Desafio XP - Backend',
      version: '1.0.0',
    },
    server: [{ url: 'http://localhost:3000', description: 'Servidor Local' }, { url: 'https://desafioxp.herokuapp.com/', description: 'Servidor Heroku' }],
  },
  apis: ['./src/routes/index.js'],
};

module.exports = swaggerConfig;

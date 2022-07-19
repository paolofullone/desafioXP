const swaggerConfig = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Desafio XP - Backend',
      description: 'API para o Desafio XP - Backend',
      version: '1.0.0',
    },
    servers: [{ url: 'https://desafioxp.herokuapp.com', description: 'Servidor Heroku' }, { url: 'http://localhost:3000', description: 'Servidor Local' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          name: 'Authorization',
          in: 'header',
          type: 'apiKey',
          description: 'JWT Authorization',
          scheme: 'bearer',
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerConfig;

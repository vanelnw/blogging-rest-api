const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
module.exports = function (app) {
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Blogging API',
      description: 'API documentation using Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./controller/user.js', './controller/author.js', './controller/blog.js'],
};

// Initialize swagger-jsdoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Serve the Swagger UI at '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
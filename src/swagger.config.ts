import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Rastreamento de Experimentos de ML',
      version: '1.0.0',
      description:
        'Uma API RESTful para gerenciar projetos, experimentos e métricas de Machine Learning.',
    },
    servers: [
      {
        url: 'http://localhost:3333',
      },
    ],
    components: {
      schemas: {
        ProjectInput: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Projeto de Classificação de Imagens',
            },
            description: {
              type: 'string',
              example: 'Usar CNN para classificar cães e gatos.',
            },
          },
          required: ['name'],
        },
        Project: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
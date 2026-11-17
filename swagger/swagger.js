const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "iTicket API with Swagger",
            version: "1.0.0",
            description: "iTicket system complete backend API documentation with Express, Sequelize, PostgreSQL, and Joi validation.",
        },
        servers: [
            {
                url: "http://localhost:3333",
                description: "Local development server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;

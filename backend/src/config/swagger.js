import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Sistema de Inventario y Control de Stock - API",
        version: "1.0.0",
        description:
            "Documentación de la API REST del backend del Sistema de Inventario y Control de Stock desarrollado como Proyecto Final Integrador.",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Servidor local",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
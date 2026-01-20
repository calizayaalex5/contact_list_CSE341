const { version } = require('react');

const swaggerAutogen = require('swagger-autogen')();

const doc = {
    swagger: "2.0",
    info: {
        title: "Contacts Api",
        description: "Una Api personalizada sobre una lista de contactos",
        version: "1.0.0"
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = "./swagger.json";
const endPointFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endPointFiles, doc);
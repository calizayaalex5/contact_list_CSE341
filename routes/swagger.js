const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerContent = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerContent))

module.exports = router
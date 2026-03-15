/*
Despliegue de Rutas
*/

const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth.routes'));
router.use('/roles', require('./rol.routes'));
router.use('/usuarios', require('./user.routes'));
router.use('/categorias', require('./category.routes'));
router.use('/productos', require('./product.routes'));

module.exports = router;
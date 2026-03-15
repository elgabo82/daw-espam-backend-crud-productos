/*
Rutas: Productos
*/

const express = require('express');
const router = express.Router();

const {
    getProductos,
    getProductoId,
    crearProducto,
    actualizarProducto,
    borrarProducto
} = require ('../controllers/product.controller.js');

const { autenticar } = require('../middlewares/auth.middleware');
const { autorizar } = require('../middlewares/role.middleware');

router.get('/', autenticar, getProductos);
router.get('/:id', autenticar, getProductoId);
router.post('/', autenticar, autorizar('admin', 'gerente'), crearProducto);
router.put('/:id', autenticar, autorizar('admin', 'gerente'), actualizarProducto);
router.delete('/:id', autenticar, autorizar('admin'), borrarProducto);

module.exports = router;
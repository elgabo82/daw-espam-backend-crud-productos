/*
Rutas: Categorías
*/

const express = require('express');
const router = express.Router();

const {
    getCategorias,
    getCategoriaId,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
} = require ('../controllers/category.controller');

const { autenticar } = require('../middlewares/auth.middleware');
const { autorizar } = require('../middlewares/role.middleware');

router.get('/', autenticar, getCategorias);
router.get('/:id', autenticar, getCategoriaId);
router.post('/', autenticar, autorizar('admin', 'gerente'), crearCategoria);
router.put('/:id', autenticar, autorizar('admin', 'gerente'), actualizarCategoria);
router.delete('/:id', autenticar, autorizar('admin'), borrarCategoria);

module.exports = router;
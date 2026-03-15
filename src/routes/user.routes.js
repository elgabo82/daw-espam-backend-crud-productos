/*
Rutas: Usuario
*/

const express = require('express');
const router = express.Router();

const {
    getUsuarios,
    getUsuarioId,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} = require ('../controllers/user.controller');

const { autenticar } = require('../middlewares/auth.middleware');
const { autorizar } = require('../middlewares/role.middleware');

router.get('/', autenticar, autorizar('admin'), getUsuarios);
router.get('/:id', autenticar, autorizar('admin'), getUsuarioId);
router.post('/', autenticar, autorizar('admin'), crearUsuario);
router.put('/:id', autenticar, autorizar('admin'), actualizarUsuario);
router.delete('/:id', autenticar, autorizar('admin'), borrarUsuario);

module.exports = router;
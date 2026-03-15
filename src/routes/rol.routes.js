/*
Rutas: Roles
*/

const express = require('express');
const router = express.Router();

const {
    getRoles,
    crearRol,
    actualizarRol,
    borrarRol
} = require('../controllers/rol.controller');

const { autenticar } = require('../middlewares/auth.middleware');
const { autorizar } = require('../middlewares/role.middleware');

router.get('/', autenticar, autorizar('admin'), getRoles);
router.post('/', autenticar, autorizar('admin'), crearRol);
router.put('/:id', autenticar, autorizar('admin'), actualizarRol);
router.delete('/:id', autenticar, autorizar('admin'), borrarRol);

module.exports = router;
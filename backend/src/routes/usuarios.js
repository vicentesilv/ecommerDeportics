const express = require('express');
const router = express.Router();
const {obtenerUsuarios, buscarUsuarios} = require('../controllers/usuarios');

router.get('/mostrarUsuarios', obtenerUsuarios);
router.get('/buscarUsuarios/:nombre', buscarUsuarios);

module.exports = router;
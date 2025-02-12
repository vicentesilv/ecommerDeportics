const express = require('express');
const router = express.Router();
const {obtenerUsuarios} = require('../controllers/usuarios');

router.get('/mostrarUsuarios', obtenerUsuarios);

module.exports = router;
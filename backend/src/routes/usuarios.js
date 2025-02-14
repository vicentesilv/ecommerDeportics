const express = require('express');
const router = express.Router();
const {obtenerUsuarios,buscarUsuarios,infoUsuario,eliminarUsuario,crearUsuario} = require('../controllers/usuarios');

router.get('/mostrarUsuarios', obtenerUsuarios);
router.get('/buscarUsuarios/:nombre', buscarUsuarios);
router.get('/infoUsuario/:id', infoUsuario);
router.delete('/eliminarUsuario/:id', eliminarUsuario);
router.post('/crearUsuario', crearUsuario);

module.exports = router;
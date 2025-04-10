const express = require('express');
const router = express.Router();
const {obtenerUsuarios,buscarUsuarios,infoUsuario,eliminarUsuario,crearUsuario} = require('../controllers/usuarios');
const { VerificarToken } = require('../middleware/middleware.verify');

router.get('/mostrarUsuarios',VerificarToken('admin'),obtenerUsuarios);
router.get('/buscarUsuarios/:nombre',VerificarToken('admin'), buscarUsuarios);
router.delete('/eliminarUsuario/:id',VerificarToken('admin'), eliminarUsuario);
router.post('/crearUsuario',VerificarToken('admin'), crearUsuario);

module.exports = router;
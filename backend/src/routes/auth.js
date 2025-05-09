const express = require('express');
const router = express.Router();
const {registro, inicioSesion, recuperarContrasena, resetearContrasena, preRegistro} = require('../controllers/auth');
const { verificarRolRuta } = require('../middleware/middleware.verify');

router.post('/preRegistro', preRegistro);
router.post('/registro/:token', registro);
router.post('/inicioSesion', inicioSesion);
router.get( '/rolRutas', verificarRolRuta);
router.post('/recuperarContrasena', recuperarContrasena);
router.post('/resetearContrasena/:token', resetearContrasena);

module.exports = router;
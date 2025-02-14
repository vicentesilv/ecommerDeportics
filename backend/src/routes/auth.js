const express = require('express');
const router = express.Router();
const {registro, inicioSesion, recuperarContrasena, resetearContrasena} = require('../controllers/auth');

router.post('/registro', registro);
router.post('/inicioSesion', inicioSesion);
router.post('/recuperarContrasena', recuperarContrasena);
router.post('/resetearContrasena/:token', resetearContrasena);

module.exports = router;
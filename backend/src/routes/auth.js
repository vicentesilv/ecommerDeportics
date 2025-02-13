const express = require('express');
const router = express.Router();
const {registro, inicioSesion, recuperarContrasena} = require('../controllers/auth');

router.post('/registro', registro);
router.post('/inicioSesion', inicioSesion);
router.post('/recuperarContrasena', recuperarContrasena);

module.exports = router;
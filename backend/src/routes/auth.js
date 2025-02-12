const express = require('express');
const router = express.Router();
const {registro, inicioSesion} = require('../controllers/auth');

router.post('/registro', registro);
router.post('/inicioSesion', inicioSesion);

module.exports = router;
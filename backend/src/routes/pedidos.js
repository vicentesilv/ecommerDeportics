const express = require('express');
const router = express.Router();
const { crearOrden } = require('../controllers/pedidos');

router.post('/crearOrden', crearOrden);


module.exports = router;

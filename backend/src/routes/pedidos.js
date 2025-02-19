const express = require('express');
const router = express.Router();
const { crearOrden, motrarOrdenes, buscarOrden } = require('../controllers/pedidos');

router.post('/crearOrden', crearOrden);
router.get('/mostrarOrdenes', motrarOrdenes);
router.get('/buscarOrden/:idUsuario', buscarOrden);


module.exports = router;

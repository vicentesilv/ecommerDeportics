const express = require('express');
const router = express.Router();
const { crearOrden, motrarOrdenes, buscarOrden, cancelarOrden, detallesOrden } = require('../controllers/pedidos');

router.post('/crearOrden', crearOrden);
router.get('/mostrarOrdenes', motrarOrdenes);
router.get('/buscarOrden/:idUsuario', buscarOrden);
router.delete('/cancelarOrden/:idOrden', cancelarOrden);
router.get('/detallesOrden/:id', detallesOrden);

module.exports = router;

const express = require('express');
const router = express.Router();
const { crearOrden, motrarOrdenes, cancelarOrden, detallesOrden, detalleOrden } = require('../controllers/pedidos');

router.post('/crearOrden', crearOrden);
router.get('/mostrarOrdenes', motrarOrdenes);
router.delete('/cancelarOrden/:idOrden', cancelarOrden);
router.get('/detallesOrden/:id', detallesOrden);
router.get('/detalleOrden/:id', detalleOrden);

module.exports = router;

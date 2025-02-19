const express = require('express');
const router = express.Router();
const { crearOrden, motrarOrdenes, buscarOrden, cancelarOrden } = require('../controllers/pedidos');

router.post('/crearOrden', crearOrden);
router.get('/mostrarOrdenes', motrarOrdenes);
router.get('/buscarOrden/:idUsuario', buscarOrden);
router.delete('/cancelarOrden/:id', cancelarOrden);

module.exports = router;

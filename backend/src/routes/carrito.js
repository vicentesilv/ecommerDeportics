const express = require('express');
const { agregarAlCarrito, eliminarDelCarrito, mostrarCarrito, vaciarCarrito } = require('../controllers/carrito');
const { VerificarToken } = require('../middleware/middleware.verify');
const router = express.Router();

router.post('/agregarAlCarrito/:idusuario',VerificarToken('cliente'), agregarAlCarrito);
router.get('/mostrarCarrito/:id', mostrarCarrito);
router.delete('/eliminarDelCarrito/:id', eliminarDelCarrito);
router.delete('/vaciarCarrito/:id', vaciarCarrito);


module.exports = router;
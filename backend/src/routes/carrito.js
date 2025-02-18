const express = require('express');
const { agregarAlCarrito, eliminarDelCarrito, mostrarCarrito, vaciarCarrito } = require('../controllers/carrito');
const router = express.Router();

router.get('/mostrarCarrito/:id', mostrarCarrito);
router.post('/agregarAlCarrito/:idusuario', agregarAlCarrito);
router.delete('/eliminarDelCarrito/:id', eliminarDelCarrito);
router.delete('/vaciarCarrito/:id', vaciarCarrito);


module.exports = router;
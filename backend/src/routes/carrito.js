const express = require('express');
const { agregarAlCarrito, eliminarDelCarrito, mostrarCarrito } = require('../controllers/carrito');
const router = express.Router();

router.get('/mostrarCarrito/:id', mostrarCarrito);
router.post('/agregarAlCarrito/:idusuario', agregarAlCarrito);
router.delete('/eliminarDelCarrito/:id', eliminarDelCarrito);


module.exports = router;
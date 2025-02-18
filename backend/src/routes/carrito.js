const express = require('express');
const { agregarAlCarrito, eliminarDelCarrito } = require('../controllers/carrito');
const router = express.Router();

router.post('/agregarAlCarrito/:idusuario', agregarAlCarrito);
router.delete('/eliminarDelCarrito/:id', eliminarDelCarrito);


module.exports = router;
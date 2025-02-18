const express = require('express');
const { agregarAlCarrito } = require('../controllers/carrito');
const router = express.Router();

router.post('/agregarAlCarrito/:idusuario', agregarAlCarrito);



module.exports = router;
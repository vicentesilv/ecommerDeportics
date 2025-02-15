const express = require('express');
const { crearProducto } = require('../controllers/productos');
const router = express.Router();
// const {obtenerProductos,buscarProductos,infoProducto,eliminarProducto,crearProducto} = require('../controllers/productos');

// router.get('/mostrarProductos', obtenerProductos);
// router.get('/buscarProductos/:nombre', buscarProductos);
// router.get('/infoProducto/:id', infoProducto);
// router.delete('/eliminarProducto/:id', eliminarProducto);
router.post('/crearProducto', crearProducto);

module.exports = router;
const express = require('express');
const { crearProducto, editarProducto, eliminarProducto, mostrarProductos, buscarProductos, infoProducto, mostrarImagen, mostrarProductosVendedor } = require('../controllers/productos');
const router = express.Router();

router.put('/editarProducto/:id', editarProducto );
router.delete('/eliminarProducto/:id', eliminarProducto);
router.get('/mostrarProductos', mostrarProductos);
router.get('/buscarProductos/:nombre', buscarProductos);
router.get('/infoProducto/:id', infoProducto);
router.get('/mostrarImagen/:nombreImagen', mostrarImagen);
router.get('/mostrarProductosVendedor/:id', mostrarProductosVendedor);



module.exports = router;
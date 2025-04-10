const express = require('express');
const { crearProducto, editarProducto, eliminarProducto, mostrarProductos, buscarProductos, infoProducto, mostrarImagen, mostrarProductosVendedor } = require('../controllers/productos');
const { VerificarToken } = require('../middleware/middleware.verify');
const router = express.Router();

router.get('/mostrarProductos',mostrarProductos);
router.get('/buscarProductos/:nombre', buscarProductos);
router.get('/infoProducto/:id', infoProducto);

router.get('/mostrarImagen/:nombreImagen', mostrarImagen);

router.post('/crearProducto', crearProducto);
router.put('/editarProducto/:id', editarProducto );
router.delete('/eliminarProducto/:id', eliminarProducto);
router.get('/mostrarProductosVendedor/:id',VerificarToken('vendedor'), mostrarProductosVendedor);


module.exports = router;

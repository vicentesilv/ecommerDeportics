const express = require('express');
const { crearProducto, editarProducto, eliminarProducto, mostrarProductos, buscarProductos, infoProducto, mostrarImagen, mostrarProductosVendedor } = require('../controllers/productos');
const { VerificarToken } = require('../middleware/middleware.verify');
const router = express.Router();

router.get('/mostrarProductos',mostrarProductos);
router.get('/buscarProductos/:nombre', buscarProductos);
router.get('/infoProducto/:id', infoProducto);

router.get('/mostrarImagen/:nombreImagen', mostrarImagen);

router.post('/crearProducto',VerificarToken('vendedor'), crearProducto);
router.put('/editarProducto/:id',VerificarToken('vendedor'), editarProducto );
router.delete('/eliminarProducto/:id', VerificarToken('vendedor'), eliminarProducto);
router.get('/mostrarProductosVendedor/:id',VerificarToken('vendedor'), mostrarProductosVendedor);


module.exports = router;

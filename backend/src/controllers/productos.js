// const db = require('../config/dbConeccion');
const path = require('path');
const sharp = require('sharp');
const db = require('../config/dbConeccion');
const fs = require('fs');
const { log } = require('console');

const crearProducto = async (req, res) => {
    const {creadopor,nombre,descripcion,stock,costoVenta,costoProduccion,status} = req.body;
   
    if (!req.files || !req.files.imagen) {
        return res.status(400).json({ error: 'La imagen es requerida.' });
    }
    const imagen = req.files.imagen;
    const nombreArchivo = Date.now() + '-' + imagen.name;
    const rutaImagen = path.join(__dirname, '../imagenes', nombreArchivo);
    const maxWidth = 400;
    const maxHeight = 700;
    try {
        const [resultado] = await db.query('insert into productos (nombre,descripcion,stock,costoVenta,costoProduccion,status,imagen,creado_por) values (?,?,?,?,?,?,?,?)',
            [nombre, descripcion, stock, costoVenta, costoProduccion, status, nombreArchivo, creadopor]);
        try{
            await sharp(imagen.data)
            .resize(maxWidth, maxHeight, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .toFile(rutaImagen);
            res.status(201).json({ message: 'Producto creado exitosamente e imagen subida y redimensionada correctamente' });
        }catch(error){
            res.status(500).send('Error al procesar la imagen.');
        }
    } catch (error) {
        res.status(500).send('Error al crear el producto.');
    }
}

const eliminarProducto = async (req, res) => {
    const {id} = req.params;
    try{
        const [eliminar] = await db.query('delete from productos where id = ?', [id]);
        res.json(eliminar);
    }catch{
        return res.status(500).json({message: error.message});
    }
}

const editarProducto = async (req, res) => {
    const {id} = req.params;
    const {nombre,descripcion,stock,costoVenta,costoProduccion,status} = req.body;
    try{
        const [editcion] = db.query('update productos set nombre = ?,descripcion = ?,stock = ?,costoVenta = ?,costoProduccion = ?,status = ? where id = ?', [nombre,descripcion,stock,costoVenta,costoProduccion,status,id]);
        res.json({message: 'Producto editado exitosamente'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}
const mostrarProductos = async (req, res) => {
    try {
        const [productos] = await db.query('select * from productos where status = "activo"');
        res.json(productos);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const infoProducto = async (req, res) => {
    const {id} = req.params;
    try{
        const [producto] = await db.query('select * from productos where id = ?', [id]);
        res.json(producto);
    }catch{
        return res.status(500).json({message: error.message});
    }
}

const buscarProductos = async (req, res) => {
    const {nombre} = req.params;
    try {
        const [productos] = await db.query('select * from productos where nombre like ?', [`%${nombre}%`]);
        res.json(productos);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const mostrarImagen = async (req, res) => {
    const { nombreImagen } = req.params;
    const ruta = path.join(__dirname, '../imagenes', nombreImagen);

    fs.access(ruta, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: 'Imagen no encontrada' });
        }
        res.sendFile(ruta);
    });
}

const mostrarProductosVendedor = async (req, res) => {
    const {id} = req.params;
    try {
        const [productos] = await db.query('select * from productos where creado_por = ?', [id]);
        res.json(productos);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}



module.exports = {
    crearProducto,
    eliminarProducto,
    editarProducto,
    mostrarProductos,
    infoProducto,
    buscarProductos,
    mostrarImagen,
    mostrarProductosVendedor,
}
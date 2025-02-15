// const db = require('../config/dbConeccion');
const path = require('path');
const sharp = require('sharp');
const db = require('../config/dbConeccion');

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
        // guardar y redimensionar la imagen
        
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
        console.error(error);
        res.status(500).send('Error al crear el producto.');
    }

}

module.exports = {
    crearProducto
}
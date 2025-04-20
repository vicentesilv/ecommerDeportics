const db =  require('../config/dbConeccion');

const agregarAlCarrito = async (req, res) => {
    const { idusuario } = req.params;
    const { idProducto, cantidad } = req.body;
    if (cantidad <= 0) {
        return res.status(400).json({ message: 'La cantidad debe ser mayor a 0' });
        
    }

    try {
        // Verificar si hay suficiente stock
        const [producto] = await db.query('SELECT stock FROM productos WHERE id = ?', [idProducto]);

        if (producto.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        if (producto[0].stock < cantidad) {
            return res.status(400).json({ message: 'Stock insuficiente para agregar al carrito' });
        }

        // Verificar si el producto ya está en el carrito
        const [existeEnCarrito] = await db.query(
            'SELECT * FROM carrito WHERE id_producto = ? AND id_usuario = ?',
            [idProducto, idusuario]
        );

        if (existeEnCarrito.length > 0) {
            // Actualizar cantidad en el carrito
            await db.query(
                'UPDATE carrito SET cantidad = cantidad + ? WHERE id_producto = ? AND id_usuario = ?',
                [cantidad, idProducto, idusuario]
            );
        } else {
            // Insertar nuevo producto en el carrito
            await db.query(
                'INSERT INTO carrito (id_producto, id_usuario, cantidad) VALUES (?, ?, ?)',
                [idProducto, idusuario, cantidad]
            );
        }

        // Actualizar el stock del producto
        await db.query(
            'UPDATE productos SET stock = stock - ? WHERE id = ?',
            [cantidad, idProducto]
        );

        // Verificar si el stock llegó a 0 y cambiar estado a inactivo
        const [updatedProduct] = await db.query(
            'SELECT stock FROM productos WHERE id = ?',
            [idProducto]
        );

        if (updatedProduct[0].stock === 0) {
            await db.query('UPDATE productos SET status = "inactivo" WHERE id = ?', [idProducto]);
        }

        res.json({ message: 'Producto agregado al carrito exitosamente' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const eliminarDelCarrito = async (req,res) => {
    const {id} = req.params;
    try{
        const [eliminar] = await db.query('delete from carrito where id = ?', [id]);
        res.json(eliminar);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

const mostrarCarrito = async (req, res) => {
    const { id } = req.params;
    try {
        const [productos] = await db.query(`
            SELECT 
                p.nombre, 
                p.descripcion, 
                p.costoVenta,
                c.id AS idCarrito, 
                p.imagen, 
                c.cantidad AS cantidadProducto
            FROM carrito c
            JOIN productos p ON p.id = c.id_producto
            WHERE c.id_usuario = ?
        `, [id]);

        res.json(productos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const vaciarCarrito = async (req,res) => {
    const {id} = req.params;
    try{
        const [carrito] = await db.query('delete from carrito where id_usuario = ?', [id]);
        res.json(carrito);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    agregarAlCarrito,
    eliminarDelCarrito,
    mostrarCarrito,
    vaciarCarrito
}
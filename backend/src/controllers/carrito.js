const db =  require('../config/dbConeccion');


const agregarAlCarrito = async (req,res) =>{
    const {idusuario} = req.params;
    const {idProducto,cantidad} = req.body;

const [producto] = await db.query('select stock from productos where id = ?', [idProducto]);

if (producto[0].stock < cantidad) {
    return res.status(400).json({message: 'Stock insuficiente para agregar al carrito'});
}
const [existingProduct] = await db.query('select * from carrito where id_producto = ? and id_usuario = ?', [idProducto, idusuario]);
if (existingProduct.length > 0) {
    await db.query('update carrito set cantidad = cantidad + ? where id_producto = ? and id_usuario = ?', [cantidad, idProducto, idusuario]);
    await db.query('update productos set stock = stock - ? where id = ?', [cantidad, idProducto]);

    // Nueva condición para cambiar el estado a inactivo si el stock llega a 0
    const [updatedProduct] = await db.query('select stock from productos where id = ?', [idProducto]);
    if (updatedProduct[0].stock === 0) {
        await db.query('update productos set status = "inactivo" where id = ?', [idProducto]);
    }

    return res.json({message: 'Producto agregado al carrito exitosamente'});
}

    try{
        const [carrito] = await db.query('insert into carrito (id_producto,id_usuario,cantidad) values (?,?,?)', [idProducto,idusuario,cantidad]);

        // Nueva condición para cambiar el estado a inactivo si el stock llega a 0
        const [updatedProduct] = await db.query('select stock from productos where id = ?', [idProducto]);
        if (updatedProduct[0].stock === 0) {
            await db.query('update productos set status = "inactivo" where id = ?', [idProducto]);
        }

        res.json(carrito);
    }catch(error){
        return res.status(500).json({message: error.message});
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

const mostrarCarrito = async (req,res) => {
    const {id} = req.params;
    try{
        const [carrito] = await db.query('select * from carrito where id_usuario = ?', [id]);
        const [productos] = await db.query('select nombre,descripcion,costoVenta,imagen, cantidad as cantidadProducto from productos,carrito where productos.id = ?', [carrito[0].id_producto]);
        res.json(productos);
    }catch(error){
        return res.status(500).json({message: error.message});
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
const db = require('../config/dbConeccion');

const crearOrden = async (req, res) => {
    const {idUsuario} = req.body;
    try{
        const [carrrito] = await db.query("select c.id_producto,c.cantidad,p.costoVenta from carrito c join productos p on c.id_producto = p.id where c.id_usuario=?", [idUsuario]);
        if(carrrito.length === 0) return res.status(400).json({message: 'El carrito está vacío'});
        const total = carrrito.reduce((acumulador, item) => acumulador + item.cantidad * item.costoVenta, 0);
        
        const [orden] = await db.query('insert into orden (id_usuario,total,estatus) values (?,?,?)', [idUsuario, total, 'pendiente']);
        const id = orden.insertId;
        for(const item of carrrito){
            await db.query('insert into detalles_orden (id_orden,id_producto,cantidad,precio) values (?,?,?,?)', [id, item.id_producto, item.cantidad, item.costoVenta]);
            await db.query('update productos set stock = stock - ? where id = ?', [item.cantidad, item.id_producto]);
        }
        await db.query('delete from carrito where id_usuario = ?', [idUsuario]);
        res.json(orden);
    }catch(error){    
        return res.status(500).json({message: error.message});
    }
};

const cancelarOrden = async (req, res) => {
    const { idOrden } = req.params;

    try {
        const [orden] = await db.query('select * from orden where id = ? and estatus = ?', [idOrden,'aprobado']);
        if (orden.length === 0) return res.status(400).json({ message: 'La orden no existe o ya fue cancelada/completada' });
        
        const [detalles] = await db.query('select * from detalles_orden where id_orden = ?', [idOrden]);

        for (const item of detalles) await db.query('update productos set stock = stock + ? where id = ?', [item.cantidad, item.id_producto]);
        await db.query('delete from detalles_orden where id_orden = ?', [idOrden]);
        await db.query('update orden set estatus = ? where id = ?', ['cancelado', idOrden]);
        res.json({ message: 'Orden cancelada exitosamente' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const motrarOrdenes = async (req, res) => {
    try {
        const [pedidos] = await db.query('select * from orden');
        res.json(pedidos);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};



const detallesOrden = async (req, res) => {
    const {id} = req.params;
    try {
        const [detalles] = await db.query('select * from detalles_orden where id_orden = ?', [id]);
        res.json(detalles);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

const detalleOrden = async (req, res) => {
    const {id} = req.params;
    try {
        const [detalles] = await db.query('select * from orden where id = ?', [id]);
        res.json(detalles);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};


module.exports = {
    crearOrden,
    motrarOrdenes,
    cancelarOrden,
    detallesOrden,
    detalleOrden
}
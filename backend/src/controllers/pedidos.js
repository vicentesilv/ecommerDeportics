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
            await db.query('insert into detalles_orden (id_oreden,id_producto,cantidad,precio) values (?,?,?,?)', [id, item.id_producto, item.cantidad, item.costoVenta]);
            await db.query('update productos set stock = stock - ? where id = ?', [item.cantidad, item.id_producto]);
        }
        await db.query('delete from carrito where id_usuario = ?', [idUsuario]);
        res.json(orden);
    }catch(error){    
        return res.status(500).json({message: error.message});
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

const buscarOrden = async (req, res) => {
    const {idUsuario} = req.params;
    const {id} = req.body;
    try {
        const [pedidos] = await db.query('select * from orden where id = ? and id_usuario = ?', [id, idUsuario]);
        res.json(pedidos);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    crearOrden,
    motrarOrdenes,
    buscarOrden
}
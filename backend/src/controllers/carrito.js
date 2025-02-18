const db =  require('../config/dbConeccion');


const agregarAlCarrito = async (req,res) =>{
    const {idusuario} = req.params;
    const {idProducto,cantidad} = req.body;
    try{
        const [carrito] = await db.query('insert into carrito (id_producto,id_usuario,cantidad) values (?,?,?)', [idProducto,idusuario,cantidad]);
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
        res.json(carrito);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};



module.exports = {
    agregarAlCarrito,
    eliminarDelCarrito,
    mostrarCarrito
}
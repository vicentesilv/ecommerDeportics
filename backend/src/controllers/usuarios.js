const db = require('../config/dbConeccion');

const obtenerUsuarios = async (req, res) => {
    try {
        const [usuarios] = await db.query('select * from usuarios');
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    obtenerUsuarios
}
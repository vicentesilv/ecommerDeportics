const db = require('../config/dbConeccion');
const bcrypt = require('bcrypt');
const validator = require('validator');

const obtenerUsuarios = async (req, res) => {
    try {
        const [usuarios] = await db.query('select * from usuarios');
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const buscarUsuarios = async (req, res) => {
    const {nombre} = req.params;
    try {
        const [usuarios] = await db.query('select * from usuarios where nombre like ?', [`%${nombre}%`]);
        res.json(usuarios);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const infoUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        const [usuario] = await db.query('select * from usuarios where id = ?', [id]);
        res.json(usuario);
    }catch{
        return res.status(500).json({message: error.message});
    }
}

const eliminarUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        const [eliminar] = await db.query('delete from usuarios where id = ?', [id]);
        res.json(eliminar);
    }catch{
        return res.status(500).json({message: error.message});
    }
}

const crearUsuario = async (req, res) => {
    const {nombre,apellido,edad,correo,contrasena,rol,domicilio,telefono} = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    if(!validator.isEmail(correo)) return res.status(400).json({message: 'Correo no válido'});
    try{
        const [usuario] =  await db.query('insert into usuarios (nombre,apellido,edad,correo,contrasena,rol,domicilio,telefono) values (?,?,?,?,?,?,?,?)', [nombre,apellido,edad,correo,hashedPassword,rol,domicilio,telefono]);
        res.json(usuario);
    }catch{
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    obtenerUsuarios,
    buscarUsuarios,
    infoUsuario,
    eliminarUsuario,
    crearUsuario
}
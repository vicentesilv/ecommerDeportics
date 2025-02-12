const db = require('../config/dbConeccion');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registro = async (req,res) => {
    const {nombre,apellido,edad,correo,contrasena,rol,domicilio,telefono} = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    if(!validator.isEmail(correo)) return res.status(400).json({message: 'Correo no válido'});
    try{
        const [registro] = await db.query('insert into usuarios (nombre,apellido,edad,correo,contrasena,rol,domicilio,telefono) values (?,?,?,?,?,?,?,?)', [nombre,apellido,edad,correo,hashedPassword,rol,domicilio,telefono]);
        res.json(registro);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

const inicioSesion = async(req,res) => {
    const {correo,contrasena} = req.body;
    if(!correo || !contrasena) return res.status(400).json({message: 'Correo y contraseña son requeridos'});
    if(!validator.isEmail(correo)) return res.status(400).json({message: 'Correo no válido'});
    try{
        const [inicioSesion] = await db.query('select * from usuarios where correo = ?', [correo]);
        const usuario = inicioSesion[0];
        if(!usuario) return res.status(401).json({message: 'usuario no existe'});
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena); 
        if(!contrasenaValida) return res.status(401).json({message: 'contraseña incorrecta'});
        
        const token = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}



module.exports = {
    registro,
    inicioSesion
}
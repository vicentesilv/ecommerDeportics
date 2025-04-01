const db = require('../config/dbConeccion');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporteEmail = require('../config/correo.config');


const preRegistro = async (req,res) => {
    const {nombre,apellido,edad,correo,contrasena,domicilio,telefono,rol} = req.body;
    if(!validator.isEmail(correo)) return res.status(400).json({message: 'Correo no válido'});
    try{
        const [preRegistro] = await db.query('select * from usuarios where correo = ?', [correo]);
        if(preRegistro.length > 0) return res.status(400).json({message: 'El correo ya se encuentra registrado'});
        const token = jwt.sign({nombre,apellido,edad,correo,contrasena,domicilio,telefono,rol}, process.env.JWT_SECRET, {expiresIn: '15m'});
        const link = `${process.env.urlConfirmarRegistro}/${token}`;
        // const link = `${process.env.urlApi}api/auth/registro${token}`;
        await transporteEmail.sendMail({
            from: process.env.mail,
            to: correo,
            subject: "Confirmar registro",
            html: `<p>Haz clic en el siguiente enlace para confirmar tu registro:</p><a href="${link}">Confirmar Registro</a>`,
        });
        res.json({message: 'Correo de confirmación enviado'});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

const registro = async (req,res) => {
    const {token} = req.params;
    const {nombre,apellido,edad,correo,contrasena,domicilio,telefono,rol} = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(contrasena, 10);
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

// Recuperación de contraseña
const recuperarContrasena = async (req, res) => {
    const { correo } = req.body;

    try {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);
        if (rows.length === 0) return res.status(404).json({ message: "Correo no registrado" });
        
        const resetToken = jwt.sign({ correo }, process.env.JWT_SECRET, { expiresIn: "10m" });
        
        const resetLink = `${process.env.urlApi}api/auth/resetearContrasena/${resetToken}`;
        await db.query("update usuarios set reset_token = ? , reset_token_expiry = date_add(now(), interval 10 minute) where correo = ?", [resetToken, correo]);
        await transporteEmail.sendMail({
            from: process.env.mail,
            to: correo,
            subject: "Recuperación de contraseña",
            html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetLink}">${resetLink}</a>`,
        });
        res.json({ message: "Correo de recuperación enviado" });
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const resetearContrasena = async (req, res) => {
    const { token } = req.params;
    const {  nuevaContrasena } = req.body;

    if (!token || !nuevaContrasena) return res.status(400).json({ message: "Token y nueva contraseña son requeridos" });

    try {
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

        const [rows] = await db.query("SELECT * FROM usuarios WHERE correo = ? AND reset_token = ?", [decodeToken.correo, token]);
        if (rows.length === 0)  return res.status(401).json({ message: "Token inválido o expirado" });
        
        const usuario = rows[0];
        if (usuario.reset_token_expiry < new Date()) return res.status(401).json({ message: "Token expirado" });
        const hashContrasena = await bcrypt.hash(nuevaContrasena, 10);

        await db.query("UPDATE usuarios SET contrasena = ?, reset_token = NULL, reset_token_expiry = NULL WHERE correo = ?", [hashContrasena, decodeToken.correo]);
        res.json({ message: "Contraseña restablecida exitosamente" });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Token inválido" });
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

module.exports = {
    preRegistro,
    registro,
    inicioSesion,
    recuperarContrasena,
    resetearContrasena
}
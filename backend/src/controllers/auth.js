const db = require('../config/dbConeccion');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const transporteEmail = require('../config/correo.config');

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


// recuperacion  y restablicimiento de la contraseña por correo
const recuperarContrasena = async (req, res) => {
    const {email }= req.body
    const user = await db.query('SELECT * FROM usuarios WHERE correo = ?', [email])
    if (!user) return res.status(400).json({message: 'El correo no existe'})
    const resetToken = jwt.sign({id: user[0].id}, process.env.JWT_SECRET, {expiresIn: '10m'})
    const resetLink = `http://localhost:3000/restablecer-contrasena/${resetToken}`
    const mailOptions = {
        from: "vicente18aldahirsilva@gmail.com",
        to: user.email,
        subject: 'Recuperación de contraseña',
        text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`
    };
    transporteEmail.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({message: error.message});
        }
        res.json({message: 'Correo enviado'});
    });
}


module.exports = {
    registro,
    inicioSesion,
    recuperarContrasena
}
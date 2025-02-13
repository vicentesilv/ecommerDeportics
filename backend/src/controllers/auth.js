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

// Recuperación de contraseña
const recuperarContrasena = async (req, res) => {
    const { correo } = req.body;

    try {
        // Buscar al usuario por su correo
        const [user] = await db.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Generar un token de restablecimiento de contraseña
        const resetToken = jwt.sign({ id: usuario.id,correo: user.correo }, process.env.JWT_SECRET, { expiresIn: '15m' });

        // Enviar correo con el enlace de restablecimiento
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        const mailOptions = {
            from: 'vicente18aldahirsilva@gmail.com',
            to: correo,
            subject: 'Recuperación de contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`
        };

        transporteEmail.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                return res.status(500).json({ message: 'Error al enviar el correo' });
            }
            res.json({ message: 'Correo enviado correctamente' });
        });
    } catch (error) {
        console.error('Error en recuperarContrasena:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    registro,
    inicioSesion,
    recuperarContrasena
}
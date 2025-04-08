const jwt = require('jsonwebtoken');


const VerificarToken = (rol) => {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).send({ message: 'Acceso denegado\nToken requerido' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send({ message: 'Acceso denegado\nToken inválido' });
            }

            req.user = user;

            if (!req.user) {
                return res.status(403).send({ message: 'Acceso denegado\nToken inválido' });
            }

            if (req.user.rol !== rol) {
                return res.status(403).send({ message: 'Acceso denegado\nRol insuficiente' });
            }

            next();
        });
    };
};




const verificarRolRuta = (req, resl) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token)  throw new Error('Token no proporcionado');
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const {id,rol,correo,nombre,apellido,edad,domicilio,telefono} = decode;

        switch (rol) {
            case 'admin':
                return resl.json({id,rol,correo,nombre,apellido,edad,domicilio,telefono});
            case 'cliente':
                return resl.json({id,rol,correo,nombre,apellido,edad,domicilio,telefono});
            case 'empleado':
                return resl.json({id,rol,correo,nombre,apellido,edad,domicilio,telefono});
            default:
                return resl.status(403).json({message: 'Acceso denegado\n Rol inválido'});
        }
    } catch (error) {
        return resl.status(403).json({message: 'Acceso denegado\n Token inválido o expirado'});
    }
};

module.exports = { 
    VerificarToken,
    verificarRolRuta
};


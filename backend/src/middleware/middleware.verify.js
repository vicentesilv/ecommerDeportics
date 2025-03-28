const jwt = require('jsonwebtoken');


const VerificarToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];   
    const token = authHeader && authHeader.split(' ')[1];   

    if(!token){
        return res.status(401).send({message: 'Acceso denegado\n Token requerido'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if(err){
            return res.status(403).send({message: 'Acceso denegado\n Token inválido'});
        }
        req.user = user;
        next();
    });

};





module.exports = { VerificarToken };


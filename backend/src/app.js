const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

// configuraciones
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true}));

// importacion de rutas
const auth = require('./routes/auth');
const usuarios = require('./routes/usuarios');

//rutas de la api   
app.use('/api/auth', auth);
app.use('/api/usuarios', usuarios);







//404 error
app.use((req, res) => res.status(404).send({error: 'ruta no encontrada'}));

module.exports = app;

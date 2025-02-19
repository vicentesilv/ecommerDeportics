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

// configuracion de fileUpload para la obtencion de imagenes
app.use(fileUpload({createParentPath: true}));

// importacion de rutas
const auth = require('./routes/auth');
const usuarios = require('./routes/usuarios');
const productos = require('./routes/productos');
const carrito = require("./routes/carrito");
const orden = require("./routes/pedidos");

//rutas de la api   
app.use('/api/auth', auth);
app.use('/api/usuarios', usuarios);
app.use('/api/productos', productos);  
app.use("/api/carrito", carrito);
app.use("/api/orden", orden);









//404 error
app.use((req, res) => res.status(404).send({error: 'ruta no encontrada'}));

module.exports = app;

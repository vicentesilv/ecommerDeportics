const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({createParentPath: true}));

//routes api   







//404 error
app.use((req, res) => res.status(404).send({error: 'ruta no encontrada'}));

module.exports = app;

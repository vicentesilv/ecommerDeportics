const app = require('./app');
const port = process.env.PORT

app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port} \n http://localhost:${port}`));

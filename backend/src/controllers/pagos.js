const db = require('../config/dbConeccion');
const {procesarPagoTarjeta} = require('../config/stripe.config');
const {procesarPagoPaypal} = require('../config/paypal.config');

const procesarPago = async (req, res) => {
    const {idOrden, metodo,numero_tarjeta,paypal_correo,fecha_vencimiento} = req.body;
    try {
        const [orden] = await db.query('select * from orden where id = ? and estatus = ?', [idOrden, 'pendiente']);   
        const monto = orden[0].total;
        let estado = "pendiente";

        if (metodo === 'tarjeta') {
            estado = await procesarPagoTarjeta(monto);
        } else if (metodo === 'paypal') {
            estado = await procesarPagoPaypal(monto);
        }

        // Guardar el pago en la base de datos
        const query = `
            INSERT INTO pago (metodo, monto, estado, numero_tarjeta, fecha_vencimiento, paypal_correo)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [metodo, monto, estado, numero_tarjeta, fecha_vencimiento, paypal_correo], (err, result) => {
            if (err) {
                console.error(err);
                db.query('update orden set estatus = ? where id = ?', ['rechazado', idOrden]);
                return res.status(500).send('Error al guardar el pago en la base de datos');
            }
            db.query('update orden set estatus = ? where id = ?', [estado, idOrden]);
            res.status(200).send({ estado, id: result.insertId });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al procesar el pago');
    }
};

module.exports = {
    procesarPago
};

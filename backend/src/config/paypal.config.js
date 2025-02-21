const paypal = require('@paypal/checkout-server-sdk');

// Configura el entorno de PayPal
const environment = new paypal.core.SandboxEnvironment(
    process.env.idClientPaypal,
    process.env.paypalSecretKey
);

// Crea el cliente de PayPal con un timeout personalizado (en milisegundos)
const paypalClient = new paypal.core.PayPalHttpClient(environment);
setTimeout(() => {
    paypalClient    
}, 30000); // 30 segundos de timeout

const procesarPagoPaypal = async (monto) => {
    try {
        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'MXN',
                    value: monto.toString(),
                },
            }],
        });

        const response = await paypalClient.execute(request);
        return response.result.status === 'COMPLETED' ? 'aprobado' : 'rechazado';
    } catch (error) {
        console.error('Error al procesar el pago con PayPal:', error);
        throw error;
    }
};

module.exports = { procesarPagoPaypal };





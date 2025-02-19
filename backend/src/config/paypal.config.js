const paypal = require('@paypal/checkout-server-sdk');

const paypalClient = new paypal.core.PayPalHttpClient(
    new paypal.core.SandboxEnvironment(
        process.env.idClientPaypal,
        process.env.paypalSecretKey
    )
);

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
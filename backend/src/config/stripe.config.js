const stripe = require('stripe')(process.env.stripeSecretKey);

const procesarPagoTarjeta = async (monto) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: monto * 100, // Stripe espera el monto en centavos
            currency: 'mxn',
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never', // Evita redireccionamientos
            },
        });

        return paymentIntent.status === 'succeeded' ? 'aprobado' : 'rechazado';
    } catch (error) {
        console.error('Error al procesar el pago con Stripe:', error);
        throw error;
    }
};

module.exports = { procesarPagoTarjeta };
const nodemailer = require('nodemailer');
const transporteEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.mail,
        pass: process.env.mailPass
    }
})

module.exports = transporteEmail
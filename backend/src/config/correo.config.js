const nodemailer = require('nodemailer');
const transporteEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "vicente18aldahirsilva@gmail.com",
        pass: "vicente1819"
    }
})

module.exports = transporteEmail
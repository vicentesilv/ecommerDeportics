const nodemailer = require('nodemailer');
const transporteEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "vicente18aldahirsilva@gmail.com",
        pass: ""
    }
})

module.exports = transporteEmail
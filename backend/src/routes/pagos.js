const express = require('express');
const router = express.Router();
const {procesarPago} = require('../controllers/pagos');

router.post('/procesarPago', procesarPago);

module.exports = router;
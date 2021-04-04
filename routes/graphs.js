const express = require('express');

const graphsController = require('../controllers/graphs');

const router = express.Router();

router.post('/getselectedcrypto', graphsController.getSelectedCrypto);
router.post('/getcryptodata', graphsController.getCryptoData);

module.exports = router;
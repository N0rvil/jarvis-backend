const express = require('express');

const contentController = require('../controllers/content');

const router = express.Router();

router.post('/getuser', contentController.getUser);

module.exports = router;
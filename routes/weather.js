const express = require('express');

const weatherController = require('../controllers/weather');

const router = express.Router();

router.post('/getweather', weatherController.getWeather);


module.exports = router;
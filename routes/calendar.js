const express = require('express');

const calendarController = require('../controllers/calendar');

const router = express.Router();

router.post('/getevents', calendarController.getEvents);
router.post('/createevent', calendarController.createEvent);
router.post('/deleteevent', calendarController.deleteEvent);
router.post('/deleteeventondate', calendarController.deleteEventOnDate);
router.post('/getdayswithevents', calendarController.getDaysWithEvents);

module.exports = router;
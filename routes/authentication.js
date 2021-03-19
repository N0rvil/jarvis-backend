const express = require('express');


const authenticationController = require('../controllers/authentication');

const router = express.Router();


router.post('/', authenticationController.checkLogin)

router.post('/register', authenticationController.register) ;
router.post('/login',authenticationController.login);
router.post('/emailVerification',authenticationController.verifyEmail);



module.exports = router;
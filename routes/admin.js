const express = require('express');


const adminController = require('../controllers/admin');

const router = express.Router();


router.get('/getallusers',adminController.getAllUsers);
router.post('/getusersessions',adminController.getUserSessions);
router.post('/banuser',adminController.banUser);
router.post('/unbanuser',adminController.unbanUser);
router.post('/promoteuser', adminController.promoteUser);
router.post('/unpromoteuser', adminController.unpromoteUser);
router.get('/getusersdata', adminController.getUsersData);



module.exports = router;
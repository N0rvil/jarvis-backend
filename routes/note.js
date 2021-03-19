const express = require('express');

const noteController = require('../controllers/note');

const router = express.Router();

router.post('/createnote', noteController.createNote);
router.post('/getnotes', noteController.getNotes);
router.post('/deletenote' ,noteController.deleteNote);
router.post('/getnotecontent' ,noteController.getNoteContent);
router.post('/updatenote' ,noteController.updateNote);

module.exports = router;
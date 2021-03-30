const express = require('express');

const linksController = require('../controllers/links');

const router = express.Router();

router.post('/getcategories' ,linksController.getCategories);
router.post('/createcategory', linksController.createCategory);
router.post('/deletecategory', linksController.deleteCategory);
router.post('/getlinks', linksController.getLinks);
router.post('/createlink', linksController.createLink);
router.post('/deletelink', linksController.deleteLink);


module.exports = router;
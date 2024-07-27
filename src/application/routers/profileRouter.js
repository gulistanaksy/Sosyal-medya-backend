const express = require('express')
const ProfileController = require('../controllers/profileController');
const profileController = new ProfileController();
const router = express.Router();

router.post('/', profileController.createProfile)
router.get('/', profileController.getProfile)

module.exports=router;